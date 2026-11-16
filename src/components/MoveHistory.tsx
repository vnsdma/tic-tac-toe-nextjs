'use client';

import React, { useState } from 'react';
import { HistoryStep, ThemeConfig } from '../types/game';
import { ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

interface MoveHistoryProps {
  history: HistoryStep[];
  currentStep: number;
  theme: ThemeConfig;
  onJumpToStep: (step: number) => void;
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({
  history,
  currentStep,
  theme,
  onJumpToStep,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (history.length <= 1) return null;

  return (
    <div className="w-full max-w-lg mb-5">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700 transition-colors text-xs text-zinc-400 outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
      >
        <span>Move history ({history.length - 1} turns)</span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {isOpen && (
        <div className="mt-1.5 p-2 rounded-lg bg-zinc-900/90 border border-zinc-800 space-y-1 max-h-44 overflow-y-auto">
          {history.map((step, idx) => {
            const isCurrent = idx === currentStep;
            let label = 'Game start';
            if (idx > 0 && step.lastMove !== null) {
              const row = Math.floor(step.lastMove / 3) + 1;
              const col = (step.lastMove % 3) + 1;
              const prevStep = history[idx - 1];
              const playerMark = prevStep.nextPlayer;
              const symbol = playerMark === 'X' ? theme.p1.symbol : theme.p2.symbol;
              label = `Turn ${idx}: ${symbol} at (r${row}, c${col})`;
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onJumpToStep(idx)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs font-mono transition-colors ${
                  isCurrent
                    ? 'bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700'
                    : 'text-zinc-400 hover:bg-zinc-850 hover:text-zinc-200'
                }`}
              >
                <span>{label}</span>
                {isCurrent ? (
                  <span className="text-[10px] bg-zinc-700 text-zinc-200 px-1 py-0.2 rounded font-sans">
                    Current
                  </span>
                ) : (
                  <RotateCcw className="w-3 h-3 text-zinc-500" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
