'use client';

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Player, ThemeConfig, GameMode } from '../types/game';
import { RotateCcw, Trophy, Flame, Sparkles } from 'lucide-react';

interface WinModalProps {
  winner: Player | 'draw';
  theme: ThemeConfig;
  gameMode: GameMode;
  streakCount: number;
  onPlayAgain: () => void;
}

export const WinModal: React.FC<WinModalProps> = ({
  winner,
  theme,
  gameMode,
  streakCount,
  onPlayAgain,
}) => {
  useEffect(() => {
    if (winner !== 'draw') {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f0ff', '#ff007f', '#ffe600', '#a855f7'],
        });
      } catch {
        // Fallback gracefully
      }
    }
  }, [winner]);

  const isDraw = winner === 'draw';
  const isXWin = winner === 'X';
  const isPvp = gameMode === 'pvp';

  const winnerName = isDraw
    ? "It's a Stalemate!"
    : isXWin
    ? theme.p1.name
    : isPvp
    ? theme.p2.name
    : 'AI Mastermind';

  const winnerSymbol = isDraw ? '🤝' : isXWin ? theme.p1.symbol : theme.p2.symbol;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm p-6 sm:p-8 rounded-3xl glass-panel border border-slate-700/80 text-center shadow-[0_0_60px_rgba(0,0,0,0.8)] animate-scale-up">
        {/* Glowing badge */}
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-4xl sm:text-5xl rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600 shadow-inner mb-4">
          {winnerSymbol}
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">
          {isDraw ? (
            <span>Draw Game</span>
          ) : (
            <>
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Victory Royale!</span>
            </>
          )}
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-100 mb-2">
          {isDraw ? 'Nobody Wins' : `${winnerName} Wins!`}
        </h3>

        <p className="text-xs text-slate-400 mb-6">
          {isDraw
            ? 'Both players played with master precision.'
            : isXWin
            ? `Congratulations! ${theme.p1.label} took the round.`
            : `Round goes to ${isPvp ? theme.p2.label : 'the Machine'}.`}
        </p>

        {streakCount >= 2 && !isDraw && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-6 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 fill-orange-400" />
            <span>{streakCount} Game Win Streak!</span>
          </div>
        )}

        <div className="flex flex-col gap-2.5">
          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Next Round</span>
          </button>
        </div>
      </div>
    </div>
  );
};
