import React, { useEffect, useState, useRef } from 'react';
import { SymbolType, Language } from '../types';
import SymbolDisplay from './SymbolDisplay';
import { SYMBOLS } from '../constants';

interface ReelProps {
  finalSymbol: SymbolType;
  isSpinning: boolean;
  stopDelay: number; // Delay before this specific reel stops
  onStop: () => void;
  reelIndex: number;
  lang: Language;
}

const Reel: React.FC<ReelProps> = ({ finalSymbol, isSpinning, stopDelay, onStop, reelIndex, lang }) => {
  const [displaySymbol, setDisplaySymbol] = useState<SymbolType>(SymbolType.SEVEN);
  const [isStopping, setIsStopping] = useState(false);
  const intervalRef = useRef<number | null>(null);
  
  // Audio effect placeholder (not implemented without assets, but logic structure is here)
  
  useEffect(() => {
    if (isSpinning) {
      setIsStopping(false);
      // Rapidly change symbols to simulate spinning blur
      intervalRef.current = window.setInterval(() => {
        const randomSym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)].type;
        setDisplaySymbol(randomSym);
      }, 80); // Change every 80ms

      // Schedule the stop
      const stopTimer = setTimeout(() => {
        setIsStopping(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
        
        // Final "landing" effect
        setDisplaySymbol(finalSymbol);
        onStop();
        
      }, stopDelay);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        clearTimeout(stopTimer);
      };
    } else if (!isStopping) {
      // Ensure we show the final symbol if not spinning and not currently stopping
      setDisplaySymbol(finalSymbol);
    }
  }, [isSpinning, finalSymbol, stopDelay, onStop]);

  return (
    <div className="relative w-24 h-32 sm:w-32 sm:h-40 md:w-40 md:h-48 bg-white border-x-4 border-slate-300 overflow-hidden shadow-[inset_0_5px_15px_rgba(0,0,0,0.3)] rounded-sm">
      {/* Reel Glass Reflection/Shine */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none z-10"></div>
      
      {/* Symbol Container */}
      <div className={`w-full h-full flex items-center justify-center transform transition-all duration-200 ${isSpinning ? 'blur-[1px]' : ''}`}>
        <SymbolDisplay type={displaySymbol} size="lg" lang={lang} />
      </div>
      
      {/* Decorative center line indicator (subtle) */}
      <div className="absolute top-1/2 left-0 w-2 h-1 bg-red-500/50 -translate-y-1/2 z-20"></div>
      <div className="absolute top-1/2 right-0 w-2 h-1 bg-red-500/50 -translate-y-1/2 z-20"></div>
    </div>
  );
};

export default Reel;