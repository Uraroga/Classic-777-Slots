import React, { useState, useCallback, useEffect } from 'react';
import { GameStatus, SymbolType, Language } from './types';
import { getRandomSymbol, calculateWin } from './utils';
import { INITIAL_BANKROLL, MIN_SPIN_TIME_MS, REEL_DELAY_MS, COST_PER_SPIN } from './constants';
import { getTranslation } from './translations';
import Reel from './components/Reel';
import PayTable from './components/PayTable';
import InstructionsModal from './components/InstructionsModal';
import { Coins, RotateCw, RefreshCw, Info, Globe, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [bankroll, setBankroll] = useState(INITIAL_BANKROLL);
  const [status, setStatus] = useState<GameStatus>(GameStatus.IDLE);
  const [showInstructions, setShowInstructions] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  
  const t = getTranslation(lang);

  // Initial symbols for display
  const [reelSymbols, setReelSymbols] = useState<[SymbolType, SymbolType, SymbolType]>([
    SymbolType.SEVEN, 
    SymbolType.SEVEN, 
    SymbolType.SEVEN
  ]);
  
  // Store the key of the message to allow translation switching
  const [messageKey, setMessageKey] = useState("ready");
  const [winAmount, setWinAmount] = useState(0);
  
  // Track which reels are spinning visually
  const [reelsSpinning, setReelsSpinning] = useState([false, false, false]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'it' : 'en');
  };

  const handleSpin = useCallback(() => {
    if (status === GameStatus.SPINNING || status === GameStatus.STOPPING) return;
    if (showInstructions) return; // Prevent spinning while modal is open

    if (bankroll < COST_PER_SPIN) {
      setMessageKey("gameOver");
      setStatus(GameStatus.GAME_OVER);
      return;
    }

    // 1. Deduct Cost
    setBankroll(prev => prev - COST_PER_SPIN);
    setMessageKey(""); // Clear message while spinning
    setWinAmount(0);
    setStatus(GameStatus.SPINNING);
    setReelsSpinning([true, true, true]);

    // 2. Determine Outcome Immediately (RNG)
    const newReels: [SymbolType, SymbolType, SymbolType] = [
      getRandomSymbol(),
      getRandomSymbol(),
      getRandomSymbol(),
    ];
    setReelSymbols(newReels);

    // 3. Visual Sequence
    // We don't calculate win here yet; we wait for visuals to finish.
  }, [bankroll, status, showInstructions]);

  const handleReelStop = useCallback((index: number) => {
    setReelsSpinning(prev => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  }, []);

  // Check for win when all reels stop
  useEffect(() => {
    if (status === GameStatus.SPINNING && !reelsSpinning.includes(true)) {
      // All reels stopped visually
      setStatus(GameStatus.STOPPING); // Brief transition
      
      const result = calculateWin(reelSymbols);
      
      if (result.isWin) {
        setBankroll(prev => prev + result.winnings);
        setWinAmount(result.winnings);
        // winType from calculateWin is now a key like 'JACKPOT_7'
        setMessageKey(result.winType || "winner"); 
        setStatus(GameStatus.WIN);
      } else {
        setMessageKey("noWin");
        setStatus(GameStatus.LOSS);
      }
    }
  }, [reelsSpinning, status, reelSymbols]);

  const resetGame = () => {
    setBankroll(INITIAL_BANKROLL);
    setStatus(GameStatus.IDLE);
    setReelSymbols([SymbolType.SEVEN, SymbolType.SEVEN, SymbolType.SEVEN]);
    setMessageKey("ready");
    setWinAmount(0);
  };

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.key === 's' || e.key === 'S') && status !== GameStatus.SPINNING && status !== GameStatus.STOPPING) {
        // Prevent scrolling with space
        if(e.code === 'Space') e.preventDefault();
        if(showInstructions) return; // Ignore keys if modal is open

        if (bankroll >= COST_PER_SPIN) {
             handleSpin();
        } else if (status === GameStatus.GAME_OVER) {
             resetGame();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSpin, bankroll, status, showInstructions]);


  const isGameOver = bankroll < COST_PER_SPIN && status !== GameStatus.SPINNING && status !== GameStatus.STOPPING;

  // Helper to get text from key safely
  const getMessageText = (key: string) => {
    if (!key) return "";
    return (t as any)[key] || key;
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-6xl px-4 py-8 relative">
      <InstructionsModal isOpen={showInstructions} onClose={() => setShowInstructions(false)} lang={lang} />
      
      {/* Left Panel: Paytable */}
      <div className="hidden lg:block">
        <PayTable lang={lang} />
      </div>

      {/* Center: The Machine */}
      <div className="relative bg-slate-800 p-6 rounded-3xl border-4 border-slate-600 shadow-2xl flex flex-col items-center slot-shadow machine-gradient w-full max-w-2xl">
        
        {/* Top Controls Toolbar - High Visibility */}
        <div className="w-full flex justify-between items-center mb-5 gap-2">
           {/* Donation Button */}
           <a
             href="https://paypal.me/uraroga"
             target="_blank"
             rel="noopener noreferrer"
             className="flex items-center gap-2 text-slate-400 hover:text-pink-400 bg-black/30 hover:bg-black/50 border border-white/5 rounded-full px-3 py-2 transition-all active:scale-95"
             title={t.donate}
           >
             <Heart size={18} className="text-pink-500 fill-pink-500/10" />
             <span className="text-xs font-bold uppercase hidden sm:inline-block">{t.donate}</span>
           </a>

           {/* Right Side: Language & Info */}
           <div className="flex items-center gap-2 sm:gap-3">
             {/* Language Toggle */}
             <button
                 onClick={toggleLanguage}
                 className="flex items-center gap-2 text-slate-300 hover:text-white bg-black/30 hover:bg-black/50 border border-white/5 rounded-full px-3 py-2 transition-all active:scale-95"
                 title="Switch Language"
              >
                 <Globe size={16} />
                 <span className="text-xs font-bold font-mono">{lang.toUpperCase()}</span>
              </button>

              {/* Info Button - Prominent */}
              <button 
                 onClick={() => setShowInstructions(true)}
                 className="flex items-center gap-2 text-yellow-300 hover:text-white bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2 transition-all active:scale-95 shadow-[0_0_10px_rgba(234,179,8,0.1)] hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                 title={t.howToPlayTooltip}
                 aria-label="Instructions"
              >
                 <Info size={18} strokeWidth={2.5} />
                 <span className="text-xs font-bold uppercase tracking-wider">{t.howToPlayTooltip}</span>
              </button>
           </div>
        </div>

        {/* Machine Header Marquee */}
        <div className="w-full text-center mb-6 bg-black/30 p-2 rounded-xl border border-white/10 relative shadow-inner">
          <h1 className="text-4xl sm:text-5xl font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-300 drop-shadow-md tracking-wider">
            777 CLASSIC
          </h1>
          <p className="text-slate-400 text-xs mt-1 tracking-[0.2em] uppercase">{t.authenticSim}</p>
        </div>

        {/* Reels Container */}
        <div className="relative bg-black p-4 rounded-xl border-4 border-yellow-600/50 shadow-inner flex gap-2 sm:gap-4 mb-8">
           {/* Payline Marker - Left */}
           <div className="absolute top-1/2 -left-3 w-4 h-1 bg-red-600 z-20 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
           
           {/* Reels */}
           {[0, 1, 2].map((i) => (
             <Reel
               key={i}
               reelIndex={i}
               finalSymbol={reelSymbols[i]}
               isSpinning={reelsSpinning[i]}
               stopDelay={MIN_SPIN_TIME_MS + (i * REEL_DELAY_MS)}
               onStop={() => handleReelStop(i)}
               lang={lang}
             />
           ))}

           {/* Payline Marker - Right */}
           <div className="absolute top-1/2 -right-3 w-4 h-1 bg-red-600 z-20 shadow-[0_0_10px_rgba(220,38,38,0.8)]"></div>
           
           {/* Payline overlay line */}
           <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-red-500/30 z-20 pointer-events-none"></div>
        </div>

        {/* Display Panel */}
        <div className="w-full grid grid-cols-2 gap-4 mb-6">
          <div className="bg-black/50 p-3 rounded-lg border border-slate-600 flex flex-col items-center">
             <span className="text-xs text-slate-400 uppercase tracking-widest mb-1">{t.bankroll}</span>
             <div className="flex items-center text-yellow-400">
               <Coins size={20} className="mr-2" />
               <span className="text-2xl font-mono font-bold">{bankroll}</span>
             </div>
          </div>
          
          <div className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-colors duration-300 ${
            status === GameStatus.WIN ? 'bg-green-900/50 border-green-500 text-green-400' :
            status === GameStatus.LOSS ? 'bg-black/50 border-slate-600 text-slate-300' :
            'bg-black/50 border-slate-600 text-yellow-400'
          }`}>
             {winAmount > 0 ? (
               <>
                 <span className="text-xs text-green-400 uppercase tracking-widest mb-1">{t.win}</span>
                 <span className="text-2xl font-mono font-bold">+{winAmount}</span>
               </>
             ) : (
                <span className="font-display tracking-wider text-center text-sm sm:text-base leading-tight">
                   {status === GameStatus.SPINNING ? t.spinning : getMessageText(messageKey)}
                </span>
             )}
          </div>
        </div>

        {/* Controls */}
        <div className="w-full flex justify-center pb-2">
          {isGameOver ? (
            <button
              onClick={resetGame}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-red-600 font-display tracking-widest rounded-full focus:outline-none focus:ring-4 focus:ring-red-500/50 hover:bg-red-700 active:scale-95 shadow-lg w-full sm:w-auto"
            >
              <RefreshCw className="mr-2" />
              {t.reset}
            </button>
          ) : (
            <button
              onClick={handleSpin}
              disabled={status === GameStatus.SPINNING || status === GameStatus.STOPPING}
              className={`
                group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-200 
                font-display tracking-[0.2em] text-xl rounded-full focus:outline-none focus:ring-4 
                w-full sm:w-auto shadow-[0_10px_20px_rgba(0,0,0,0.5)]
                ${status === GameStatus.SPINNING 
                  ? 'bg-slate-600 cursor-not-allowed opacity-80' 
                  : 'gold-gradient hover:brightness-110 active:scale-95 text-black border-b-4 border-yellow-800 focus:ring-yellow-500/50'
                }
              `}
            >
              <span className="drop-shadow-sm flex items-center">
                {status === GameStatus.SPINNING ? t.spinning : (
                  <>{t.spin} <span className="text-xs ml-2 opacity-60 font-mono tracking-normal normal-case">(-1 {t.credits})</span></>
                )}
              </span>
            </button>
          )}
        </div>
        
        <p className="mt-6 text-slate-500 text-xs text-center max-w-xs">
          {t.pressToSpinPart1}<span className="font-bold text-slate-300">[S]</span>{t.pressToSpinPart2}<span className="font-bold text-slate-300">[SPACE]</span>{t.pressToSpinPart3}
        </p>

      </div>

      {/* Mobile Paytable (Visible only on small screens) */}
      <div className="lg:hidden w-full">
         <PayTable lang={lang} />
      </div>

    </div>
  );
};

export default App;