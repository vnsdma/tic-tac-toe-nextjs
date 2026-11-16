'use client';

import React from 'react';
import { Player, ScoreState, ThemeConfig, GameMode } from '../types/game';
import { Trophy, Flame, User, Bot, Users } from 'lucide-react';

interface ScoreBoardProps {
  scores: ScoreState;
  currentTurn: Player;
  theme: ThemeConfig;
  gameMode: GameMode;
  isAiTurn: boolean;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  scores,
  currentTurn,
  theme,
  gameMode,
  isAiTurn,
}) => {
  const isPvp = gameMode === 'pvp';
  const isXTurn = currentTurn === 'X';
  const isOTurn = currentTurn === 'O';

  return (
    <div className="w-full max-w-lg mb-6">
      {/* Cards container */}
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
              Active Turn
            </span>
          )}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span className="truncate max-w-[80px]">{theme.p1.name}</span>
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
              {isAiTurn ? 'AI Thinking...' : 'Active Turn'}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1">
            {isPvp ? (
              <Users className="w-3.5 h-3.5 text-pink-400" />
            ) : (
              <Bot className="w-3.5 h-3.5 text-pink-400" />
            )}
            <span className="truncate max-w-[80px]">
              {isPvp ? theme.p2.name : 'AI Bot'}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl mb-1">{theme.p2.symbol}</div>
          <div className="text-xl sm:text-2xl font-black text-slate-100 font-mono">
            {scores.o}
          </div>
        </div>
      </div>
    </div>
  );
};
