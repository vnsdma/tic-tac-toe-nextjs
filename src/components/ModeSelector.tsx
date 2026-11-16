'use client';

import React from 'react';
import { GameMode } from '../types/game';

interface ModeSelectorProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onSelectMode,
}) => {
  const modes: { id: GameMode; label: string; desc: string }[] = [
    {
      id: 'pvp',
      label: 'Local 2P',
      desc: 'Pass and play',
    },
    {
      id: 'ai-easy',
      label: 'AI: Easy',
      desc: 'Random moves',
    },
    {
      id: 'ai-medium',
      label: 'AI: Medium',
      desc: 'Tactical blocks',
    },
    {
      id: 'ai-unbeatable',
      label: 'AI: Master',
      desc: 'Minimax engine',
    },
  ];

  return (
    <div className="w-full max-w-lg mb-5">
      <div className="mb-2 px-1 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
        Opponent Mode
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {modes.map((m) => {
          const isSelected = m.id === currentMode;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectMode(m.id)}
              className={`flex flex-col items-center py-2 px-2.5 rounded-lg border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
                isSelected
                  ? 'bg-zinc-800 border-zinc-500 text-zinc-100'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
              }`}
            >
              <span className="font-medium text-xs mb-0.5">{m.label}</span>
              <span className="text-[10px] text-zinc-500 truncate">{m.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
