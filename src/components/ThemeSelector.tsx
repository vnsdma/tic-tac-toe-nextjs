'use client';

import React from 'react';
import { THEMES } from '../lib/themes';
import { ThemeId } from '../types/game';

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
    <div className="w-full max-w-lg mb-5">
      <div className="flex items-center justify-between mb-2 px-1 text-xs text-zinc-500">
        <span className="font-medium uppercase tracking-wider text-[11px]">
          Visual Style
        </span>
        <span>{THEMES[currentTheme].name}</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {themeList.map((t) => {
          const isSelected = t.id === currentTheme;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onSelectTheme(t.id)}
              className={`flex flex-col items-center py-2 px-2.5 rounded-lg border transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 ${
                isSelected
                  ? 'bg-zinc-800 border-zinc-500 text-zinc-100'
                  : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300'
              }`}
            >
              <div className="flex items-center gap-1.5 font-mono text-sm mb-0.5">
                <span>{t.p1.symbol}</span>
                <span className="text-[10px] text-zinc-600">vs</span>
                <span>{t.p2.symbol}</span>
              </div>
              <span className="text-xs truncate">{t.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
