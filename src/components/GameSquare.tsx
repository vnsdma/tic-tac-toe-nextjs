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
    if (value === 'X') return theme.p1.color;
    if (value === 'O') return theme.p2.color;
    return '';
  };

  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      disabled={disabled || value !== null}
      aria-label={`Square ${index + 1}${value ? `, ${value}` : ', empty'}`}
      className={`
        relative flex items-center justify-center rounded-xl border
        aspect-square text-3xl sm:text-4xl font-semibold select-none
        transition-colors outline-none focus-visible:ring-2 focus-visible:ring-zinc-400
        ${theme.squareBg}
        ${isWinningSquare
          ? 'bg-zinc-700/80 border-zinc-300 font-bold'
          : isLastMove
          ? 'border-zinc-500 ring-1 ring-zinc-500/40'
          : theme.squareBorder
        }
        ${!value && !disabled ? 'cursor-pointer hover:bg-zinc-800/90' : ''}
        ${disabled && !value ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {/* Placed Mark */}
      {value ? (
        <span className={getColorClasses()}>
          {getSymbol()}
        </span>
      ) : (
        /* Ghost mark on hover */
        !disabled && (
          <span className="opacity-0 hover:opacity-20 text-2xl sm:text-3xl transition-opacity text-zinc-400">
            {currentTurn === 'X' ? theme.p1.symbol : theme.p2.symbol}
          </span>
        )
      )}

      {/* Grid position index hint */}
      <span className="absolute bottom-1 right-2 text-[10px] text-zinc-600 font-mono">
        {index + 1}
      </span>
    </button>
  );
};
