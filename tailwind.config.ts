import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        ink:    "#050507",
        mint:   "#00e5b4",
        violet: "#7c3aed",
        acid:   "#c8ff00",
        s0: "#050507", // Pure dark canvas background
        s1: "#0f0f12", // Surface 1
        s2: "#161619", // Surface 2
        s3: "#222226", // Surface 3
        t100: "#ffffff", // Pure white headlines
        t200: "rgba(255, 255, 255, 0.85)", // Readable body
        t300: "rgba(255, 255, 255, 0.50)", // Secondary text
        t400: "rgba(255, 255, 255, 0.30)", // Muted tags / details
        "b-dim": "rgba(255, 255, 255, 0.06)", // Soft border
        "b-mid": "rgba(255, 255, 255, 0.12)", // Mid border
        "b-hi":  "rgba(255, 255, 255, 0.20)", // Highlighted border
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "22px",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        "400": "400ms",
      },
    },
  },
  plugins: [],
};
export default config;
