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
        ink:    "#0c0c0e",
        mint:   "#00e5b4",
        violet: "#7c3aed",
        acid:   "#c8ff00",
        s0: "#0c0c0e",
        s1: "#111113",
        s2: "#18181b",
        s3: "#1f1f24",
        t100: "#e8e6e0",
        t200: "rgba(232,230,224,0.65)",
        t300: "rgba(232,230,224,0.40)",
        t400: "rgba(232,230,224,0.22)",
        "b-dim": "rgba(255,255,255,0.06)",
        "b-mid": "rgba(255,255,255,0.10)",
        "b-hi":  "rgba(255,255,255,0.16)",
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
