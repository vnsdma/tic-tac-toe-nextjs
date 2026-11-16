# Tic-Tac-Toe (Next.js & React 19)

A responsive Tic-Tac-Toe web application built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS. Features an unbeatable Minimax algorithm, customizable themes, Web Audio API sound effects, and full keyboard navigation.

## Features

- **Opponent Modes**: Play locally with pass-and-play, or challenge an AI across three difficulty levels:
  - Easy: Random move selection.
  - Medium: Heuristic blocking and basic opportunistic wins.
  - Master: Recursive Minimax with depth penalty scoring (unbeatable).
- **Side Selection**: Play as X (moves first), play as O (computer makes the opening move), or randomize who starts.
- **Synthesized Audio**: Sound effects generated entirely at runtime with the browser's Web Audio API (`AudioContext`). Zero external audio asset dependencies or network requests.
- **Move History & Replay**: Inspect turn coordinates step-by-step and rewind to any previous board state.
- **Accessibility & Keyboard Navigation**: Full WCAG compliance using native buttons with proper ARIA attributes, live regions (`aria-live="polite"`), and direct numeric key placement (`1`-`9`), restart (`R`), and mute (`M`).
- **Visual Styles**: Switch between Minimal Dark, Terminal, Nordic Frost, and Geometric themes.

## Getting Started

### Prerequisites

- Node.js 18+ (tested on Node 20 and 22+)
- npm or pnpm

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run start
```

## Vercel Deployment

This project uses standard Next.js conventions and requires no special environment variables.

1. Push this repository to GitHub.
2. In the Vercel dashboard, click **Add New Project** and import the repository.
3. Keep the default Next.js build settings and click **Deploy**.

## Tech Stack

- **Framework**: Next.js 15
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Celebrations**: canvas-confetti
