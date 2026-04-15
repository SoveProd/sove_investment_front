import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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
        borderLight: "var(--color-border-light)", // 👈 ДОБАВИТЬ

        text: "var(--color-text)",
        textSecondary: "var(--color-text-secondary)",
        textMuted: "var(--color-text-muted)", // 👈 ДОБАВИТЬ
        textPlaceholder: "var(--color-text-placeholder)", // 👈 ДОБАВИТЬ

        primary: "var(--color-primary)",
        primaryHover: "var(--color-primary-hover)",

        graphite: "var(--color-graphite)",

        adminAccent: "var(--color-admin-accent)",
        adminMuted: "var(--color-admin-muted)",
        adminBorder: "var(--color-admin-border)",
        adminSoft: "var(--color-admin-soft)",
        adminSurfaceWarm: "var(--color-admin-surface-warm)",
        adminActiveBg: "var(--color-admin-active-bg)",
        adminHoverBg: "var(--color-admin-hover-bg)",
        adminHoverBorder: "var(--color-admin-hover-border)",
        adminCheckboxBorder: "var(--color-admin-checkbox-border)",
        adminPlaceholder: "var(--color-admin-placeholder)",

        slotFill: "var(--color-slot-fill)",
        slotStroke: "var(--color-slot-stroke)",
      },
    },
  },
  plugins: [],
};

export default config;
