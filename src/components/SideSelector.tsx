'use client';

import React from 'react';
import { Player, PlayerSideChoice, ThemeConfig, GameMode } from '../types/game';
import { Dices, UserCheck } from 'lucide-react';

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

  const options: { id: PlayerSideChoice; title: string; subtitle: string; symbol: React.ReactNode }[] = [
    {
      id: 'X',
      title: isPvp ? 'P1 Starts' : 'Play as P1',
      subtitle: `${theme.p1.name} (1st)`,
      symbol: <span className="text-lg">{theme.p1.symbol}</span>,
    },
    {
      id: 'O',
      title: isPvp ? 'P2 Starts' : 'Play as P2',
      subtitle: `${theme.p2.name} (2nd)`,
      symbol: <span className="text-lg">{theme.p2.symbol}</span>,
    },
    {
      id: 'random',
      title: 'Random Side',
      subtitle: 'Surprise me',
      symbol: <Dices className="w-5 h-5 text-amber-400" />,
    },
  ];

  return (
    <div className="w-full max-w-lg mb-6">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
          {isPvp ? 'Who Goes First' : 'Choose Your Side'}
        </span>
        <span className="text-xs text-slate-500">
          {isPvp
            ? `Starting: ${humanPlayer === 'X' ? theme.p1.name : theme.p2.name}`
            : `Playing as: ${humanPlayer === 'X' ? theme.p1.name : theme.p2.name} (${humanPlayer})`}
        </span>
      </div>

      <div
        role="radiogroup"
        aria-label={isPvp ? 'Who goes first selection' : 'Player side selection'}
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
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-400 ring-1 ring-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {opt.symbol}
                <span className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                  {opt.title}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 truncate max-w-full">
                {opt.subtitle}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
