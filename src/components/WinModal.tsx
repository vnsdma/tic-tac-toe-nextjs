'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Player, ThemeConfig, GameMode } from '../types/game';
import { RotateCcw } from 'lucide-react';

interface WinModalProps {
  winner: Player | 'draw';
  theme: ThemeConfig;
  gameMode: GameMode;
  humanPlayer: Player;
  aiPlayer: Player;
  streakCount: number;
  onPlayAgain: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({
  winner,
  theme,
  gameMode,
  humanPlayer,
  aiPlayer,
  streakCount,
  onPlayAgain,
}) => {
  useEffect(() => {
    if (winner !== 'draw') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#ffffff', '#a1a1aa', '#71717a', '#38bdf8'],
        });
      } catch {
        // Fallback gracefully
      }
    }
  }, [winner]);

  const isDraw = winner === 'draw';
  const isPvp = gameMode === 'pvp';
  const isHumanWin = !isPvp && winner === humanPlayer;

  let heading = 'Game drawn';
  let detail = 'All 9 positions filled without a three-in-a-row.';

  if (!isDraw) {
    if (isPvp) {
      const winnerName = winner === 'X' ? theme.p1.name : theme.p2.name;
      heading = `${winnerName} wins`;
      detail = `Completed a winning three-in-a-row sequence.`;
    } else if (isHumanWin) {
      heading = 'You won';
      detail = `Completed a three-in-a-row sequence.`;
    } else {
      heading = 'Computer wins';
      detail = `The AI completed a three-in-a-row sequence.`;
    }
  }

  const markSymbol = isDraw ? '—' : winner === 'X' ? theme.p1.symbol : theme.p2.symbol;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="win-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-sm p-6 rounded-2xl bg-zinc-900 border border-zinc-800 text-center shadow-2xl animate-scale-up">
        <div className="mx-auto w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 mb-4">
          {markSymbol}
        </div>

        <div className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-1">
          {isDraw ? 'Result' : 'Round Finished'}
        </div>

        <h3 id="win-modal-title" className="text-xl font-bold text-zinc-100 mb-1.5">
          {heading}
        </h3>

        <p className="text-xs text-zinc-400 mb-5 leading-relaxed">{detail}</p>

        {streakCount >= 2 && !isDraw && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs">
            <span>{streakCount} game win streak</span>
          </div>
        )}

        <button
          type="button"
          onClick={onPlayAgain}
          autoFocus
          className="w-full py-2.5 px-4 rounded-lg font-medium text-sm bg-zinc-100 hover:bg-white text-zinc-950 transition-colors flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Next round</span>
        </button>
      </div>
    </div>
  );
};
