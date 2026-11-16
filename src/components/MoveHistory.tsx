'use client';

import React, { useState } from 'react';
import { HistoryStep, ThemeConfig } from '../types/game';
import { History, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

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
    <div className="w-full max-w-lg mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/40 border border-slate-800 hover:bg-slate-800/50 transition-colors text-xs font-semibold text-slate-300"
      >
        <span className="flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-cyan-400" />
          Move History & Time Travel ({history.length - 1} moves)
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5 max-h-48 overflow-y-auto">
          {history.map((step, idx) => {
            const isCurrent = idx === currentStep;
            let label = 'Game Start';
            if (idx > 0 && step.lastMove !== null) {
              const row = Math.floor(step.lastMove / 3) + 1;
              const col = (step.lastMove % 3) + 1;
              const prevStep = history[idx - 1];
              const playerMark = prevStep.nextPlayer;
              const symbol = playerMark === 'X' ? theme.p1.symbol : theme.p2.symbol;
              label = `Move #${idx}: ${symbol} placed at (Row ${row}, Col ${col})`;
            }

            return (
              <button
                key={idx}
                onClick={() => onJumpToStep(idx)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  isCurrent
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <span>{label}</span>
                {isCurrent ? (
                  <span className="text-[10px] bg-cyan-500 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                    Current
                  </span>
                ) : (
                  <RotateCcw className="w-3 h-3 opacity-60" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
