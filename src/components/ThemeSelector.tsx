'use client';

import React from 'react';
import { THEMES } from '../lib/themes';
import { ThemeId } from '../types/game';
import { Sparkles } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onSelectTheme,
}) => {
  const themeList = Object.values(THEMES);

  return (
    <div className="w-full max-w-lg mb-6">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          Skin / Theme
        </span>
        <span className="text-xs text-slate-500">
          {THEMES[currentTheme].name}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {themeList.map((t) => {
          const isSelected = t.id === currentTheme;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTheme(t.id)}
              className={`flex flex-col items-center p-2.5 rounded-xl border text-left transition-all duration-200 outline-none ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-400 ring-1 ring-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                  : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 text-base mb-1">
                <span>{t.p1.symbol}</span>
                <span className="text-[10px] text-slate-500 font-mono">vs</span>
                <span>{t.p2.symbol}</span>
              </div>
              <span
                className={`text-xs font-medium truncate max-w-full ${
                  isSelected ? 'text-cyan-300 font-semibold' : 'text-slate-400'
                }`}
              >
                {t.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
