import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cyber: {
          neonCyan: "#00f0ff",
          neonPink: "#ff007f",
          neonYellow: "#ffe600",
          neonPurple: "#a855f7",
          darkBg: "#0a0b10",
          panelBg: "#12141f",
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "scale-up": "scaleUp 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", filter: "drop-shadow(0 0 15px rgba(0,240,255,0.7))" },
          "50%": { opacity: "0.6", filter: "drop-shadow(0 0 5px rgba(0,240,255,0.3))" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleUp: {
          "0%": { opacity: "0", transform: "scale(0.5)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
