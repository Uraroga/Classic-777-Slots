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
 * Cost = 10 Credits.
 * 
 * MAJOR WINS (isWin = true):
 * 3 x 7      -> 1000
 * 3 x BAR    -> 200
 * 3 x BELL   -> 100
 * 3 x CHERRY -> 50
 * 
 * SMALL RETURNS (isWin = false, must be < 10):
 * 2 x BELL   -> 5
 * 1 x BELL   -> 2
 * 2 x CHERRY -> 5
 * 1 x CHERRY -> 2
 * 
 * Mixed partials sum up (e.g. 1 Bell + 1 Cherry = 4), as long as it's not a 3-match win.
 */
export const calculateWin = (reels: [SymbolType, SymbolType, SymbolType]): Omit<SpinResult, 'reels'> => {
  const counts = reels.reduce((acc, symbol) => {
    acc[symbol] = (acc[symbol] || 0) + 1;
    return acc;
  }, {} as Record<SymbolType, number>);

  // 1. Check 3 of a kind (Real Wins) - Exclusive
  if (counts[SymbolType.SEVEN] === 3) return { winnings: 1000, isWin: true, winType: 'JACKPOT_7' };
  if (counts[SymbolType.BAR] === 3) return { winnings: 200, isWin: true, winType: 'BIG_WIN_BAR' };
  if (counts[SymbolType.BELL] === 3) return { winnings: 100, isWin: true, winType: 'WIN_BELL' };
  if (counts[SymbolType.CHERRY] === 3) return { winnings: 50, isWin: true, winType: 'WIN_CHERRY' };

  // 2. Check Partial Matches (Returns, not Wins)
  let returnAmount = 0;
  let returnType = '';

  // Bell Partials
  if (counts[SymbolType.BELL] === 2) {
    returnAmount += 5;
    returnType = 'RETURN_2_BELL';
  } else if (counts[SymbolType.BELL] === 1) {
    returnAmount += 2;
    returnType = 'RETURN_1_BELL';
  }

  // Cherry Partials
  if (counts[SymbolType.CHERRY] === 2) {
    returnAmount += 5;
    returnType = 'RETURN_2_CHERRY';
  } else if (counts[SymbolType.CHERRY] === 1) {
    returnAmount += 2;
    returnType = 'RETURN_1_CHERRY';
  }

  if (returnAmount > 0) {
    // If we have mixed types (e.g. Bell and Cherry), use a generic return message
    const key = (counts[SymbolType.BELL] && counts[SymbolType.CHERRY]) ? 'RETURN_MIXED' : returnType;
    return { winnings: returnAmount, isWin: false, winType: key };
  }

  return { winnings: 0, isWin: false };
};