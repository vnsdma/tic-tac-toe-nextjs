'use client';

import React from 'react';
import { GameMode } from '../types/game';
import { Users, Bot, Zap, ShieldAlert, Sparkles } from 'lucide-react';

interface ModeSelectorProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onSelectMode,
}) => {
  const modes: { id: GameMode; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'pvp',
      label: '2 Players',
      icon: <Users className="w-3.5 h-3.5" />,
      desc: 'Local Pass & Play',
    },
    {
      id: 'ai-easy',
      label: 'AI: Easy',
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" />,
      desc: 'Relaxed / Casual bot',
    },
    {
      id: 'ai-medium',
      label: 'AI: Medium',
      icon: <Zap className="w-3.5 h-3.5 text-amber-400" />,
      desc: 'Smart blocking bot',
    },
    {
      id: 'ai-unbeatable',
      label: 'AI: Master',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />,
      desc: 'Minimax unbeatable bot',
    },
  ];

  return (
    <div className="w-full max-w-lg mb-6">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <Bot className="w-3.5 h-3.5 text-cyan-400" />
          Game Mode
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {modes.map((m) => {
          const isSelected = m.id === currentMode;
          return (
            <button
              key={m.id}
              onClick={() => onSelectMode(m.id)}
              className={`flex flex-col items-center p-2.5 rounded-xl border transition-all duration-200 outline-none ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-400 ring-1 ring-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1 font-semibold text-xs text-slate-200">
                {m.icon}
                <span>{m.label}</span>
              </div>
              <span className="text-[10px] text-slate-400 truncate max-w-full">
                {m.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
