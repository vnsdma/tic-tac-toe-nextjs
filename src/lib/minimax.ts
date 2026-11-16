import { Player, SquareValue, WinState, GameMode } from '../types/game';

export const WINNING_COMBINATIONS: [number, number, number][] = [
  [0, 1, 2], // Row 1
  [3, 4, 5], // Row 2
  [6, 7, 8], // Row 3
  [0, 3, 6], // Col 1
  [1, 4, 7], // Col 2
  [2, 5, 8], // Col 3
  [0, 4, 8], // Diagonal 1
  [2, 4, 6], // Diagonal 2
];

export function checkWinState(board: SquareValue[]): WinState {
  for (const line of WINNING_COMBINATIONS) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }

  const isFull = board.every((sq) => sq !== null);
  if (isFull) {
    return { winner: 'draw', line: null };
  }

  return { winner: null, line: null };
}

export function getAvailableMoves(board: SquareValue[]): number[] {
  const moves: number[] = [];
  board.forEach((val, idx) => {
    if (val === null) moves.push(idx);
  });
  return moves;
}

// Minimax algorithm with depth scoring
function minimax(
  board: SquareValue[],
  depth: number,
  isMaximizing: boolean,
  aiPlayer: Player,
  humanPlayer: Player
): { score: number; move?: number } {
  const winState = checkWinState(board);

  if (winState.winner === aiPlayer) {
    return { score: 10 - depth };
  }
  if (winState.winner === humanPlayer) {
    return { score: depth - 10 };
  }
  if (winState.winner === 'draw') {
    return { score: 0 };
  }

  const availableMoves = getAvailableMoves(board);

  if (isMaximizing) {
    let maxScore = -Infinity;
    let bestMove = availableMoves[0];

    for (const move of availableMoves) {
      board[move] = aiPlayer;
      const result = minimax(board, depth + 1, false, aiPlayer, humanPlayer);
      board[move] = null;

      if (result.score > maxScore) {
        maxScore = result.score;
        bestMove = move;
      }
    }
    return { score: maxScore, move: bestMove };
  } else {
    let minScore = Infinity;
    let bestMove = availableMoves[0];

    for (const move of availableMoves) {
      board[move] = humanPlayer;
      const result = minimax(board, depth + 1, true, aiPlayer, humanPlayer);
      board[move] = null;

      if (result.score < minScore) {
        minScore = result.score;
        bestMove = move;
      }
    }
    return { score: minScore, move: bestMove };
  }
}

export function calculateAiMove(
  board: SquareValue[],
  mode: GameMode,
  aiPlayer: Player = 'O'
): number | null {
  const availableMoves = getAvailableMoves(board);
  if (availableMoves.length === 0) return null;

  const humanPlayer: Player = aiPlayer === 'X' ? 'O' : 'X';

  // 1. Easy: Random
  if (mode === 'ai-easy') {
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
  }

  // 2. Medium: 65% Minimax, 35% Random
  if (mode === 'ai-medium') {
    // Check if immediate win or block is available
    for (const move of availableMoves) {
      board[move] = aiPlayer;
      if (checkWinState(board).winner === aiPlayer) {
        board[move] = null;
        return move;
      }
      board[move] = null;
    }
    for (const move of availableMoves) {
      board[move] = humanPlayer;
      if (checkWinState(board).winner === humanPlayer) {
        board[move] = null;
        return move;
      }
      board[move] = null;
    }

    if (Math.random() < 0.35) {
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      return availableMoves[randomIndex];
    }
  }

  // 3. Unbeatable: Pure Minimax
  const boardCopy = [...board];
  const result = minimax(boardCopy, 0, true, aiPlayer, humanPlayer);
  return result.move ?? availableMoves[0];
}
