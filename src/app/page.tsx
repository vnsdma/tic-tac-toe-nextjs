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

  // Score state
  const [scores, setScores] = useState<ScoreState>({
    x: 0,
    o: 0,
    draws: 0,
    streakPlayer: null,
    streakCount: 0,
  });

  // History state for time-travel
  const [history, setHistory] = useState<HistoryStep[]>([
    { board: Array(9).fill(null), lastMove: null, nextPlayer: 'X' },
  ]);
  const [currentStep, setCurrentStep] = useState(0);

  const theme = THEMES[currentTheme];
  const aiPlayer: Player = humanPlayer === 'X' ? 'O' : 'X';
  const winState = checkWinState(board);
  const isGameOver = winState.winner !== null;
  const isHumanTurn = gameMode === 'pvp' || currentTurn === humanPlayer;

  // Initialize sounds mute state from storage
  useEffect(() => {
    setIsMuted(sounds.getMuted());
  }, []);

  // Update scores when someone wins or draws
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

  // Apply a move
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

      // Add to history
      const newHistory = history.slice(0, currentStep + 1);
      newHistory.push({
        board: newBoard,
        lastMove: index,
        nextPlayer,
      });
      setHistory(newHistory);
      setCurrentStep(newHistory.length - 1);

      // Check win condition
      const result = checkWinState(newBoard);
      if (result.winner) {
        handleGameEnd(result.winner);
      }
    },
    [board, isGameOver, history, currentStep, handleGameEnd]
  );

  // Trigger AI move when it's AI's turn
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
    }, 400);

    return () => clearTimeout(timer);
  }, [currentTurn, gameMode, aiPlayer, isGameOver, board, makeMove]);

  // Reset round
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

  // Handle side selection change
  const handleSelectSide = (choice: PlayerSideChoice) => {
    setSideChoice(choice);
    resetGame(choice);
  };

  // Reset all scores
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

  // Jump to step (time-travel)
  const jumpToStep = (stepIndex: number) => {
    const target = history[stepIndex];
    setBoard(target.board);
    setCurrentTurn(target.nextPlayer);
    setLastMoveIndex(target.lastMove);
    setCurrentStep(stepIndex);
    sounds.playClick();
  };

  // Keyboard shortcut listener
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
      className={`min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-b ${theme.bgGradient} transition-colors duration-500`}
    >
      {/* Top Header */}
      <header className="w-full max-w-lg flex items-center justify-between py-3 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-pink-500 flex items-center justify-center font-black text-slate-950 text-sm shadow-md">
            XO
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-100 flex items-center gap-1.5">
              <span>Tic-Tac-Toe Pro</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                v1.1
              </span>
            </h1>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const muted = sounds.toggleMute();
              setIsMuted(muted);
            }}
            title={isMuted ? 'Unmute Audio (M)' : 'Mute Audio (M)'}
            aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 outline-none"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            type="button"
            onClick={() => resetGame()}
            title="New Game (R)"
            aria-label="Restart game round"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400 text-xs font-semibold text-slate-200 transition-all shadow-sm focus-visible:ring-2 focus-visible:ring-cyan-400 outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
            <span>New Game</span>
          </button>
        </div>
      </header>

      {/* Main Game Arena */}
      <div className="w-full max-w-lg flex flex-col items-center">
        {/* Scoreboard */}
        <ScoreBoard
          scores={scores}
          currentTurn={currentTurn}
          theme={theme}
          gameMode={gameMode}
          humanPlayer={humanPlayer}
          aiPlayer={aiPlayer}
          isAiThinking={isAiThinking}
        />

        {/* 3x3 Board Grid */}
        <section
          aria-label="Tic-Tac-Toe Game Board"
          className={`relative w-full aspect-square max-w-[360px] sm:max-w-[400px] p-4 rounded-3xl border backdrop-blur-xl transition-all duration-300 ${theme.boardBg} mb-6`}
        >
          <div className="grid grid-cols-3 gap-3 w-full h-full">
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

        {/* Side Selector (Choose Side / Who Goes First) */}
        <SideSelector
          sideChoice={sideChoice}
          humanPlayer={humanPlayer}
          theme={theme}
          gameMode={gameMode}
          onSelectSide={handleSelectSide}
        />

        {/* Game Mode Selector */}
        <ModeSelector
          currentMode={gameMode}
          onSelectMode={(mode) => {
            setGameMode(mode);
            resetGame();
          }}
        />

        {/* Theme Selector */}
        <ThemeSelector
          currentTheme={currentTheme}
          onSelectTheme={(themeId) => setCurrentTheme(themeId)}
        />

        {/* Move History / Time Travel */}
        <MoveHistory
          history={history}
          currentStep={currentStep}
          theme={theme}
          onJumpToStep={jumpToStep}
        />

        {/* Reset Scores Option */}
        <div className="flex items-center justify-between w-full max-w-lg px-2 text-xs text-slate-500 mb-8">
          <span>Shortcuts: [1-9] Place mark • [R] Restart • [M] Mute</span>
          <button
            type="button"
            onClick={resetScores}
            className="hover:text-rose-400 underline underline-offset-2 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 outline-none rounded"
          >
            Reset All Stats
          </button>
        </div>
      </div>

      {/* Victory / Draw Modal */}
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

      {/* Footer */}
      <footer className="w-full max-w-lg pt-4 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span>Built with Next.js 15, React 19 & Tailwind CSS</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-medium">Ready for Vercel Deployment</span>
        </div>
      </footer>
    </main>
  );
}
