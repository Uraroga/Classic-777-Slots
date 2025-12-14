export enum SymbolType {
  BLANK = 'BLANK',
  CHERRY = 'CHERRY',
  BAR = 'BAR',
  BELL = 'BELL',
  SEVEN = 'SEVEN',
}

export type Language = 'en' | 'it';

export interface SymbolConfig {
  type: SymbolType;
  weight: number; // Probability weight 0-100
  label: string;
  value: number; // Base value for internal logic if needed
}

export interface SpinResult {
  reels: [SymbolType, SymbolType, SymbolType];
  winnings: number;
  isWin: boolean;
  winType?: string; // Now refers to a translation key
}

export enum GameStatus {
  IDLE = 'IDLE',
  SPINNING = 'SPINNING',
  STOPPING = 'STOPPING',
  WIN = 'WIN',
  LOSS = 'LOSS',
  GAME_OVER = 'GAME_OVER',
}