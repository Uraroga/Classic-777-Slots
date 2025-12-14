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
 * 3 x 7 -> 100
 * 3 x BAR -> 40
 * 3 x BELL -> 20
 * 3 x CHERRY -> 10
 * 2 x CHERRY (Any position on payline) -> 2
 * 1 x CHERRY (Any position on payline) -> 1
 */
export const calculateWin = (reels: [SymbolType, SymbolType, SymbolType]): Omit<SpinResult, 'reels'> => {
  const counts = reels.reduce((acc, symbol) => {
    acc[symbol] = (acc[symbol] || 0) + 1;
    return acc;
  }, {} as Record<SymbolType, number>);

  // Check 3 of a kind - Returning KEYS defined in translations.ts
  if (counts[SymbolType.SEVEN] === 3) return { winnings: 100, isWin: true, winType: 'JACKPOT_7' };
  if (counts[SymbolType.BAR] === 3) return { winnings: 40, isWin: true, winType: 'BIG_WIN_BAR' };
  if (counts[SymbolType.BELL] === 3) return { winnings: 20, isWin: true, winType: 'WIN_BELL' };
  if (counts[SymbolType.CHERRY] === 3) return { winnings: 10, isWin: true, winType: 'WIN_CHERRY' };

  // Check Cherry counts (if not 3 of a kind)
  const cherryCount = counts[SymbolType.CHERRY] || 0;
  if (cherryCount === 2) return { winnings: 2, isWin: true, winType: 'WIN_2_CHERRY' };
  if (cherryCount === 1) return { winnings: 1, isWin: true, winType: 'WIN_1_CHERRY' };

  return { winnings: 0, isWin: false };
};