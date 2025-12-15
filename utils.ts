import { SYMBOLS, COST_PER_SPIN } from './constants';
import { SpinResult, SymbolType } from './types';

/**
 * Selects a random symbol based on defined weights.
 * Simulates the physical reel strip probability.
 */
export const getRandomSymbol = (): SymbolType => {
  const totalWeight = SYMBOLS.reduce((sum, s) => sum + s.weight, 0);
  let random = Math.random() * totalWeight;

  for (const symbol of SYMBOLS) {
    if (random < symbol.weight) {
      return symbol.type;
    }
    random -= symbol.weight;
  }
  
  return SymbolType.BLANK; // Fallback
};

/**
 * Core Payout Logic:
 * Cost = 20 Credits.
 * 
 * MAJOR WINS (isWin = true):
 * 3 x 7      -> 250
 * 3 x BAR    -> 50
 * 3 x BELL   -> 25
 * 3 x CHERRY -> 10
 * 
 * SMALL RETURNS (isWin = false, treated as returns/pushes):
 * 2 x BELL   -> 4
 * 2 x CHERRY -> 4
 * 
 * Single symbols no longer pay.
 */
export const calculateWin = (reels: [SymbolType, SymbolType, SymbolType]): Omit<SpinResult, 'reels'> => {
  const counts = reels.reduce((acc, symbol) => {
    acc[symbol] = (acc[symbol] || 0) + 1;
    return acc;
  }, {} as Record<SymbolType, number>);

  // 1. Check 3 of a kind (Real Wins) - Exclusive
  if (counts[SymbolType.SEVEN] === 3) return { winnings: 250, isWin: true, winType: 'JACKPOT_7' };
  if (counts[SymbolType.BAR] === 3) return { winnings: 50, isWin: true, winType: 'BIG_WIN_BAR' };
  if (counts[SymbolType.BELL] === 3) return { winnings: 25, isWin: true, winType: 'WIN_BELL' };
  if (counts[SymbolType.CHERRY] === 3) return { winnings: 10, isWin: true, winType: 'WIN_CHERRY' };

  // 2. Check Partial Matches (Returns, not Wins)
  // With 3 reels, it is impossible to have multiple "2 of a kind" wins simultaneously.
  
  if (counts[SymbolType.BELL] === 2) {
    return { winnings: 4, isWin: false, winType: 'RETURN_2_BELL' };
  }

  if (counts[SymbolType.CHERRY] === 2) {
    return { winnings: 4, isWin: false, winType: 'RETURN_2_CHERRY' };
  }

  return { winnings: 0, isWin: false };
};