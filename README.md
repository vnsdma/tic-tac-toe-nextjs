# 🎮 Tic-Tac-Toe Pro | React & Next.js Showcase

An ultra-polished, feature-complete Tic-Tac-Toe web application built with **React 19**, **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS**. Designed with modern cyber-glass aesthetics, zero external audio asset dependencies, and an unbeatable Minimax AI.

---

## ✨ Features that Stand Out

### 1. 🤖 Unbeatable Minimax AI Engine
- **Easy Mode**: Casual, relaxed play with randomized moves.
- **Medium Mode**: Strategic blocking & counter-attacks.
- **Master Mode (Unbeatable)**: Full recursive **Minimax algorithm with depth penalty scoring**. Mathematically guarantees the AI cannot be defeated.

### 2. 🎨 4 Dynamic Custom Themes & Character Packs
Switch themes on the fly with custom symbols, glowing neon effects, and animations:
- ⚡ **Cyberpunk Neon**: Electric Cyan Blade (`⚡`) vs Magenta Pulse (`🔥`)
- 🐾 **Pixel Pets**: Mischief Kitty (`🐱`) vs Good Doggo (`🐶`)
- 👾 **Arcade 1984**: Shadow Ghost (`👻`) vs Golden Star (`⭐`)
- 🚀 **Cosmic Duel**: Cosmo Rocket (`🚀`) vs UFO Invader (`🛸`)

### 3. 🔊 Zero-Asset Synthesized Web Audio
- High-performance, self-contained sound effects generated directly via the browser's **Web Audio API (`AudioContext`)**.
- No external `.mp3`/`.wav` files to load or fail.
- Distinct tones for Player 1 blips, Player 2 resonance, victory fanfare arpeggios, and draw sounds.
- Persistent mute toggle with keyboard shortcut (`M`).

### 4. ⏳ Interactive Move History & Time Travel
- Turn-by-turn history log tracking every coordinate.
- Allows players to "time travel" back to any previous move and inspect or replay from that state.

### 5. 📊 Live Competitive Scoreboard
- Real-time score tracker for Player 1, Player 2 / AI, and Ties.
- Dynamic **Win Streak Counter** (`🔥 3 Streak!`).
- Active turn indicator with pulsing animations.

### 6. ⌨️ Keyboard & Accessibility Controls
- **1 – 9**: Place mark directly on grid positions.
- **R**: Instant restart / new game.
- **M**: Mute / unmute audio.
- Fully accessible with ARIA attributes and focus rings.

---

## 🚀 Quick Start (Local Development)

```bash
# Clone the repository
git clone <your-repo-url>
cd tic-tac-toe-pro

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deploy to Vercel in 1 Minute

1. Push this project to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: complete tic-tac-toe pro application"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New" > "Project"**.
3. Import your GitHub repository.
4. Click **Deploy**. Vercel will automatically detect Next.js and build it flawlessly.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: [Canvas Confetti](https://github.com/catdad/canvas-confetti) & Web Audio API
