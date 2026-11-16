'use client';

import React from 'react';
import { Player, ScoreState, ThemeConfig, GameMode } from '../types/game';
import { Trophy, Flame, User, Bot, Users } from 'lucide-react';

interface ScoreBoardProps {
  scores: ScoreState;
  currentTurn: Player;
  theme: ThemeConfig;
  gameMode: GameMode;
  humanPlayer: Player;
  aiPlayer: Player;
  isAiThinking: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  scores,
  currentTurn,
  theme,
  gameMode,
  humanPlayer,
  aiPlayer,
  isAiThinking,
}) => {
  const isPvp = gameMode === 'pvp';
  const isXTurn = currentTurn === 'X';
  const isOTurn = currentTurn === 'O';

  const isXAi = !isPvp && aiPlayer === 'X';
  const isOAi = !isPvp && aiPlayer === 'O';

  const p1Label = isPvp
    ? theme.p1.name
    : isXAi
    ? 'AI Bot'
    : 'You (P1)';

  const p2Label = isPvp
    ? theme.p2.name
    : isOAi
    ? 'AI Bot'
    : 'You (P2)';

  return (
    <section aria-label="Scoreboard" className="w-full max-w-lg mb-6">
      {/* Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isAiThinking
          ? `AI is calculating next move as ${currentTurn === 'X' ? theme.p1.symbol : theme.p2.symbol}`
          : `Current turn: ${currentTurn === 'X' ? p1Label : p2Label}`}
      </div>

      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5 items-center">
        {/* Player X */}
        <div
          className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 border ${
            isXTurn
              ? 'glass-panel border-cyan-400/80 shadow-[0_0_20px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/40 -translate-y-0.5'
              : 'bg-slate-900/60 border-slate-800 opacity-80'
          }`}
        >
          {isXTurn && (
            <span className="absolute -top-2.5 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-cyan-500 text-slate-950 rounded-full shadow-sm animate-pulse">
              {isXAi && isAiThinking ? 'AI Thinking...' : 'Active Turn'}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
            {isXAi ? (
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
            ) : isPvp ? (
              <Users className="w-3.5 h-3.5 text-cyan-400" />
            ) : (
              <User className="w-3.5 h-3.5 text-cyan-400" />
            )}
            <span className="truncate max-w-[85px]">{p1Label}</span>
          </div>
          <div className="text-2xl sm:text-3xl mb-1">{theme.p1.symbol}</div>
          <div className="text-xl sm:text-2xl font-black text-slate-100 font-mono">
            {scores.x}
          </div>
        </div>

        {/* Center / Draws / Streak */}
        <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-slate-900/40 border border-slate-800 text-center">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">
            <Trophy className="w-3 h-3 text-amber-400" />
            <span>Draws</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-slate-200 font-mono">
            {scores.draws}
          </span>

          {scores.streakCount >= 2 && scores.streakPlayer && (
            <div className="mt-1 flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-[10px] text-amber-300 font-semibold animate-pulse">
              <Flame className="w-3 h-3 text-orange-400 fill-orange-400" />
              <span>{scores.streakCount} Streak!</span>
            </div>
          )}
        </div>

        {/* Player O / AI */}
        <div
          className={`relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 border ${
            isOTurn
              ? 'glass-panel border-pink-400/80 shadow-[0_0_20px_rgba(236,72,153,0.25)] ring-1 ring-pink-400/40 -translate-y-0.5'
              : 'bg-slate-900/60 border-slate-800 opacity-80'
          }`}
        >
          {isOTurn && (
            <span className="absolute -top-2.5 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-pink-500 text-slate-950 rounded-full shadow-sm animate-pulse">
              {isOAi && isAiThinking ? 'AI Thinking...' : 'Active Turn'}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
            {isOAi ? (
              <Bot className="w-3.5 h-3.5 text-pink-400" />
            ) : isPvp ? (
              <Users className="w-3.5 h-3.5 text-pink-400" />
            ) : (
              <User className="w-3.5 h-3.5 text-pink-400" />
            )}
            <span className="truncate max-w-[85px]">{p2Label}</span>
          </div>
          <div className="text-2xl sm:text-3xl mb-1">{theme.p2.symbol}</div>
          <div className="text-xl sm:text-2xl font-black text-slate-100 font-mono">
            {scores.o}
          </div>
        </div>
      </div>
    </section>
  );
};
