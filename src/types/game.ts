export type Player = 'X' | 'O';
export type SquareValue = Player | null;

export type GameMode = 'pvp' | 'ai-easy' | 'ai-medium' | 'ai-unbeatable';

export type ThemeId = 'cyber' | 'retro' | 'pets' | 'space';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  badge: string;
  description: string;
  bgGradient: string;
  boardBg: string;
  squareBg: string;
  squareBorder: string;
  p1: {
    name: string;
    label: string;
    symbol: string;
    color: string;
    accentColor: string;
    glow: string;
  };
  p2: {
    name: string;
    label: string;
    symbol: string;
    color: string;
    accentColor: string;
    glow: string;
  };
}

export interface WinState {
  winner: Player | 'draw' | null;
  line: [number, number, number] | null;
}

export interface ScoreState {
  x: number;
  o: number;
  draws: number;
  streakPlayer: Player | null;
  streakCount: number;
}

export interface HistoryStep {
  board: SquareValue[];
  lastMove: number | null;
  nextPlayer: Player;
}
