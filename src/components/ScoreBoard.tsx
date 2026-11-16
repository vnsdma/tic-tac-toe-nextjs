'use client';

import React from 'react';
import { Player, ScoreState, ThemeConfig, GameMode } from '../types/game';
import { User, Bot, Users } from 'lucide-react';

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

  const p1Label = isPvp ? 'Player 1' : isXAi ? 'AI' : 'You';
  const p2Label = isPvp ? 'Player 2' : isOAi ? 'AI' : 'You';

  return (
    <section aria-label="Scoreboard" className="w-full max-w-lg mb-6">
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {isAiThinking
          ? `AI is choosing a move`
          : `Current turn: ${currentTurn === 'X' ? p1Label : p2Label}`}
      </div>

      <div className="grid grid-cols-3 gap-2.5 items-center">
        {/* Player X */}
        <div
          className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-colors ${
            isXTurn
              ? 'bg-zinc-800/90 border-zinc-500 shadow-sm'
              : 'bg-zinc-900/60 border-zinc-800'
          }`}
        >
          {isXTurn && (
            <span className="absolute -top-2 px-1.5 py-0.5 text-[9px] uppercase font-semibold tracking-wider bg-zinc-200 text-zinc-950 rounded">
              {isXAi && isAiThinking ? 'Thinking' : 'Turn'}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
            {isXAi ? <Bot className="w-3.5 h-3.5" /> : isPvp ? <Users className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            <span className="truncate">{p1Label}</span>
          </div>
          <div className="text-xl font-bold font-mono text-zinc-100 mb-0.5">
            {theme.p1.symbol}
          </div>
          <div className="text-lg font-bold text-zinc-100 font-mono">
            {scores.x}
          </div>
        </div>

        {/* Draws */}
        <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 text-center">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            Draws
          </div>
          <span className="text-lg font-bold text-zinc-300 font-mono">
            {scores.draws}
          </span>
          {scores.streakCount >= 2 && scores.streakPlayer && (
            <span className="text-[10px] text-zinc-400 mt-0.5">
              {scores.streakCount} streak
            </span>
          )}
        </div>

        {/* Player O */}
        <div
          className={`relative flex flex-col items-center justify-center p-3 rounded-xl border transition-colors ${
            isOTurn
              ? 'bg-zinc-800/90 border-zinc-500 shadow-sm'
              : 'bg-zinc-900/60 border-zinc-800'
          }`}
        >
          {isOTurn && (
            <span className="absolute -top-2 px-1.5 py-0.5 text-[9px] uppercase font-semibold tracking-wider bg-zinc-200 text-zinc-950 rounded">
              {isOAi && isAiThinking ? 'Thinking' : 'Turn'}
            </span>
          )}
          <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-1">
            {isOAi ? <Bot className="w-3.5 h-3.5" /> : isPvp ? <Users className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            <span className="truncate">{p2Label}</span>
          </div>
          <div className="text-xl font-bold font-mono text-zinc-100 mb-0.5">
            {theme.p2.symbol}
          </div>
          <div className="text-lg font-bold text-zinc-100 font-mono">
            {scores.o}
          </div>
        </div>
      </div>
    </section>
  );
};
