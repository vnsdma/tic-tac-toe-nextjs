'use client';

import React from 'react';
import { Player, PlayerSideChoice, ThemeConfig, GameMode } from '../types/game';

interface SideSelectorProps {
  sideChoice: PlayerSideChoice;
  humanPlayer: Player;
  theme: ThemeConfig;
  gameMode: GameMode;
  onSelectSide: (choice: PlayerSideChoice) => void;
}

export const SideSelector: React.FC<SideSelectorProps> = ({
  sideChoice,
  humanPlayer,
  theme,
  gameMode,
  onSelectSide,
}) => {
  const isPvp = gameMode === 'pvp';

  const options: { id: PlayerSideChoice; title: string; subtitle: string; symbol: string }[] = [
    {
      id: 'X',
      title: isPvp ? 'P1 Starts' : 'Play as X',
      subtitle: `${theme.p1.symbol} (first)`,
      symbol: theme.p1.symbol,
    },
    {
      id: 'O',
      title: isPvp ? 'P2 Starts' : 'Play as O',
      subtitle: `${theme.p2.symbol} (second)`,
      symbol: theme.p2.symbol,
    },
    {
      id: 'random',
      title: 'Random',
      subtitle: 'Coin toss',
      symbol: '?',
    },
  ];

  return (
    <div className="w-full max-w-lg mb-5">
      <div className="flex items-center justify-between mb-2 px-1 text-xs text-zinc-400">
        <span className="font-medium uppercase tracking-wider text-[11px] text-zinc-500">
          {isPvp ? 'First Move' : 'Your Mark'}
        </span>
        <span className="text-zinc-500">
          {isPvp
            ? `${humanPlayer === 'X' ? 'P1' : 'P2'} starts`
            : `Playing as ${humanPlayer}`}
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label={isPvp ? 'Select who moves first' : 'Select player mark'}
        className="grid grid-cols-3 gap-2"
      >
        {options.map((opt) => {
          const isSelected = sideChoice === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectSide(opt.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg border text-left transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
                isSelected
                  ? 'bg-zinc-800 border-zinc-500 text-zinc-100'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-medium text-xs mb-0.5">
                <span className="font-mono">{opt.symbol}</span>
                <span>{opt.title}</span>
              </div>
              <span className="text-[10px] text-zinc-500 truncate">
                {opt.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
