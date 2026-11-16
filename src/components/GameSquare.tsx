'use client';

import React from 'react';
import { Player, SquareValue, ThemeConfig } from '../types/game';

interface GameSquareProps {
  index: number;
  value: SquareValue;
  isWinningSquare: boolean;
  isLastMove: boolean;
  disabled: boolean;
  theme: ThemeConfig;
  currentTurn: Player;
  onClick: (index: number) => void;
}

export const GameSquare: React.FC<GameSquareProps> = ({
  index,
  value,
  isWinningSquare,
  isLastMove,
  disabled,
  theme,
  currentTurn,
  onClick,
}) => {
  const getSymbol = () => {
    if (value === 'X') return theme.p1.symbol;
    if (value === 'O') return theme.p2.symbol;
    return null;
  };

  const getColorClasses = () => {
    if (value === 'X') return `${theme.p1.color} ${theme.p1.glow}`;
    if (value === 'O') return `${theme.p2.color} ${theme.p2.glow}`;
    return '';
  };

  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      disabled={disabled || value !== null}
      aria-label={`Square ${index + 1}, ${value ? `marked as ${value}` : 'empty'}`}
      className={`
        square-btn relative flex items-center justify-center rounded-2xl border
        aspect-square text-4xl sm:text-5xl font-extrabold select-none
        transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400
        ${theme.squareBg}
        ${isWinningSquare
          ? 'bg-amber-400/20 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] scale-105 z-10 animate-bounce'
          : isLastMove
          ? 'border-cyan-400/80 ring-1 ring-cyan-400/50'
          : theme.squareBorder
        }
        ${!value && !disabled ? 'cursor-pointer group' : ''}
        ${disabled && !value ? 'opacity-70 cursor-not-allowed' : ''}
      `}
    >
      {/* Background radial glow */}
      {isWinningSquare && (
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 animate-pulse pointer-events-none" />
      )}

      {/* Placed Mark */}
      {value ? (
        <span className={`animate-scale-up ${getColorClasses()}`}>
          {getSymbol()}
        </span>
      ) : (
        /* Subtle Ghost Mark on Hover */
        !disabled && (
          <span className="opacity-0 group-hover:opacity-30 text-3xl sm:text-4xl transition-opacity duration-150 grayscale filter">
            {currentTurn === 'X' ? theme.p1.symbol : theme.p2.symbol}
          </span>
        )
      )}

      {/* Grid number index hint for keyboard nav */}
      <span className="absolute bottom-1 right-2 text-[10px] text-slate-500/40 font-mono">
        {index + 1}
      </span>
    </button>
  );
};
