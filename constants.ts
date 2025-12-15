import { SymbolConfig, SymbolType } from './types';

// Total weight should sum to 100
// Adjusted for new "Partial Return" logic (Bell + Cherry)
// Cost = 20. Partials (2 symbols) return 4.
export const SYMBOLS: SymbolConfig[] = [
  { type: SymbolType.BLANK, weight: 50, label: 'BLANK', value: 0 },
  { type: SymbolType.CHERRY, weight: 25, label: 'CHERRY', value: 1 },
  { type: SymbolType.BAR, weight: 15, label: 'BAR', value: 2 },
  { type: SymbolType.BELL, weight: 8, label: 'BELL', value: 3 },
  { type: SymbolType.SEVEN, weight: 2, label: '7', value: 4 },
];

export const COST_PER_SPIN = 20;
export const INITIAL_BANKROLL = 500;

export const REEL_DELAY_MS = 500; // Delay between each reel stopping
export const MIN_SPIN_TIME_MS = 1000; // Minimum time the first reel spins