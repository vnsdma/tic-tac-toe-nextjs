import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tic-Tac-Toe Pro | React & Next.js Showcase',
  description: 'An interactive, responsive Tic-Tac-Toe game with Unbeatable Minimax AI, dynamic themes, sound effects, and scoreboard.',
  keywords: ['Tic-Tac-Toe', 'React', 'Next.js', 'Tailwind CSS', 'Minimax AI', 'TypeScript', 'Vercel'],
  authors: [{ name: 'Candidate' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
