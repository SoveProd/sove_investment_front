import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        main: ["var(--font-main)"],
      },

      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        surfaceAlt: "var(--color-surface-alt)",

        border: "var(--color-border)",
        borderSoft: "var(--color-border-soft)",

        text: "var(--color-text)",
        textSecondary: "var(--color-text-secondary)",

        primary: "var(--color-primary)",
        primaryHover: "var(--color-primary-hover)",

        graphite: "var(--color-graphite)",
        
        slotFill: "var(--color-slot-fill)",
        slotStroke: "var(--color-slot-stroke)",
      },
    },
  },
  plugins: [],
};

export default config;
