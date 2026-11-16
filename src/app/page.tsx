'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Player, SquareValue, GameMode, ThemeId, ScoreState, HistoryStep, PlayerSideChoice } from '../types/game';
import { THEMES } from '../lib/themes';
import { checkWinState, calculateAiMove } from '../lib/minimax';
import { sounds } from '../lib/audio';
import { GameSquare } from '../components/GameSquare';
import { ScoreBoard } from '../components/ScoreBoard';
import { ThemeSelector } from '../components/ThemeSelector';
import { ModeSelector } from '../components/ModeSelector';
import { SideSelector } from '../components/SideSelector';
import { MoveHistory } from '../components/MoveHistory';
import { WinModal } from '../components/WinModal';
import { RotateCcw, Volume2, VolumeX } from 'lucide-react';

export default function TicTacToePage() {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<Player>('X');
  const [gameMode, setGameMode] = useState<GameMode>('ai-unbeatable');
  const [currentTheme, setCurrentTheme] = useState<ThemeId>('cyber');
  const [sideChoice, setSideChoice] = useState<PlayerSideChoice>('X');
  const [humanPlayer, setHumanPlayer] = useState<Player>('X');
  const [isMuted, setIsMuted] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [lastMoveIndex, setLastMoveIndex] = useState<number | null>(null);

  const [scores, setScores] = useState<ScoreState>({
    x: 0,
    o: 0,
    draws: 0,
    streakPlayer: null,
    streakCount: 0,
  });

  const [history, setHistory] = useState<HistoryStep[]>([
    { board: Array(9).fill(null), lastMove: null, nextPlayer: 'X' },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const theme = THEMES[currentTheme];
  const aiPlayer: Player = humanPlayer === 'X' ? 'O' : 'X';
  const winState = checkWinState(board);
  const isGameOver = winState.winner !== null;
  const isHumanTurn = gameMode === 'pvp' || currentTurn === humanPlayer;

  useEffect(() => {
    setIsMuted(sounds.getMuted());
  }, []);

  const handleGameEnd = useCallback((winner: Player | 'draw') => {
    if (winner === 'draw') {
      sounds.playDraw();
      setScores((prev) => ({
        ...prev,
        draws: prev.draws + 1,
        streakPlayer: null,
        streakCount: 0,
      }));
    } else {
      sounds.playWin();
      setScores((prev) => {
        const isSameStreak = prev.streakPlayer === winner;
        const streakCount = isSameStreak ? prev.streakCount + 1 : 1;
        return {
          ...prev,
          x: winner === 'X' ? prev.x + 1 : prev.x,
          o: winner === 'O' ? prev.o + 1 : prev.o,
          streakPlayer: winner,
          streakCount,
        };
      });
    }
  }, []);

  const makeMove = useCallback(
    (index: number, player: Player) => {
      if (board[index] !== null || isGameOver) return;

      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);
      setLastMoveIndex(index);
      sounds.playMove(player);

      const nextPlayer: Player = player === 'X' ? 'O' : 'X';
      setCurrentTurn(nextPlayer);

      const newHistory = history.slice(0, currentStep + 1);
      newHistory.push({
        board: newBoard,
        lastMove: index,
        nextPlayer,
      });
      setHistory(newHistory);
      setCurrentStep(newHistory.length - 1);

      const result = checkWinState(newBoard);
      if (result.winner) {
        handleGameEnd(result.winner);
      }
    },
    [board, isGameOver, history, currentStep, handleGameEnd]
  );

  useEffect(() => {
    if (gameMode === 'pvp' || currentTurn !== aiPlayer || isGameOver) {
      return;
    }

    setIsAiThinking(true);
    const timer = setTimeout(() => {
      const aiMove = calculateAiMove(board, gameMode, aiPlayer);
      if (aiMove !== null) {
        makeMove(aiMove, aiPlayer);
      }
      setIsAiThinking(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [currentTurn, gameMode, aiPlayer, isGameOver, board, makeMove]);

  const resetGame = useCallback((newSideChoice?: PlayerSideChoice) => {
    const choice = newSideChoice ?? sideChoice;
    const resolvedHuman: Player =
      choice === 'random' ? (Math.random() < 0.5 ? 'X' : 'O') : choice;

    setHumanPlayer(resolvedHuman);
    setBoard(Array(9).fill(null));
    setCurrentTurn('X');
    setLastMoveIndex(null);
    setIsAiThinking(false);
    setHistory([{ board: Array(9).fill(null), lastMove: null, nextPlayer: 'X' }]);
    setCurrentStep(0);
    sounds.playClick();
  }, [sideChoice]);

  const handleSelectSide = (choice: PlayerSideChoice) => {
    setSideChoice(choice);
    resetGame(choice);
  };

  const resetScores = () => {
    setScores({
      x: 0,
      o: 0,
      draws: 0,
      streakPlayer: null,
      streakCount: 0,
    });
    resetGame();
  };

  const jumpToStep = (stepIndex: number) => {
    const target = history[stepIndex];
    setBoard(target.board);
    setCurrentTurn(target.nextPlayer);
    setLastMoveIndex(target.lastMove);
    setCurrentStep(stepIndex);
    sounds.playClick();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'r' || e.key === 'R') {
        resetGame();
      } else if (e.key === 'm' || e.key === 'M') {
        const muted = sounds.toggleMute();
        setIsMuted(muted);
      } else if (e.key >= '1' && e.key <= '9') {
        const num = parseInt(e.key, 10) - 1;
        if (!isAiThinking && isHumanTurn) {
          makeMove(num, currentTurn);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [makeMove, isAiThinking, isHumanTurn, currentTurn, resetGame]);

  return (
    <main
      className={`min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-b ${theme.bgGradient} transition-colors duration-300 font-sans`}
    >
      <header className="w-full max-w-lg flex items-center justify-between py-3 mb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-sm font-semibold tracking-tight text-zinc-100 flex items-center gap-2">
            <span>Tic-Tac-Toe</span>
            <span className="text-[10px] font-mono text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded">
              Next.js 15
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const muted = sounds.toggleMute();
              setIsMuted(muted);
            }}
            title={isMuted ? 'Unmute Audio (M)' : 'Mute Audio (M)'}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-zinc-600" /> : <Volume2 className="w-4 h-4 text-zinc-300" />}
          </button>

          <button
            type="button"
            onClick={() => resetGame()}
            title="Reset Game (R)"
            aria-label="Restart round"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 text-xs font-medium text-zinc-300 transition-colors focus-visible:ring-2 focus-visible:ring-zinc-400 outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>
      </header>

      <div className="w-full max-w-lg flex flex-col items-center">
        <ScoreBoard
          scores={scores}
          currentTurn={currentTurn}
          theme={theme}
          gameMode={gameMode}
          humanPlayer={humanPlayer}
          aiPlayer={aiPlayer}
          isAiThinking={isAiThinking}
        />

        <section
          aria-label="Game board"
          className={`relative w-full aspect-square max-w-[340px] sm:max-w-[380px] p-3 rounded-2xl border transition-colors ${theme.boardBg} mb-5`}
        >
          <div className="grid grid-cols-3 gap-2.5 w-full h-full">
            {board.map((value, idx) => {
              const isWinningSquare = winState.line ? winState.line.includes(idx) : false;
              const isLastMove = lastMoveIndex === idx;

              return (
                <GameSquare
                  key={idx}
                  index={idx}
                  value={value}
                  isWinningSquare={isWinningSquare}
                  isLastMove={isLastMove}
                  disabled={isGameOver || isAiThinking || !isHumanTurn}
                  theme={theme}
                  currentTurn={currentTurn}
                  onClick={(i) => makeMove(i, currentTurn)}
                />
              );
            })}
          </div>
        </section>

        <SideSelector
          sideChoice={sideChoice}
          humanPlayer={humanPlayer}
          theme={theme}
          gameMode={gameMode}
          onSelectSide={handleSelectSide}
        />

        <ModeSelector
          currentMode={gameMode}
          onSelectMode={(mode) => {
            setGameMode(mode);
            resetGame();
          }}
        />

        <ThemeSelector
          currentTheme={currentTheme}
          onSelectTheme={(themeId) => setCurrentTheme(themeId)}
        />

        <MoveHistory
          history={history}
          currentStep={currentStep}
          theme={theme}
          onJumpToStep={jumpToStep}
        />

        <div className="flex items-center justify-between w-full max-w-lg px-1 text-[11px] text-zinc-500 mb-6">
          <span>Shortcuts: 1-9 to place • R to restart • M to mute</span>
          <button
            type="button"
            onClick={resetScores}
            className="hover:text-zinc-300 underline underline-offset-2 transition-colors focus-visible:ring-1 focus-visible:ring-zinc-400 outline-none"
          >
            Reset score history
          </button>
        </div>
      </div>

      {winState.winner && (
        <WinModal
          winner={winState.winner}
          theme={theme}
          gameMode={gameMode}
          humanPlayer={humanPlayer}
          aiPlayer={aiPlayer}
          streakCount={scores.streakCount}
          onPlayAgain={() => resetGame()}
        />
      )}

      <footer className="w-full max-w-lg pt-3 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-600">
        <span>React 19, Next.js 15, TypeScript</span>
        <span>Keyboard accessible</span>
      </footer>
    </main>
  );
}
