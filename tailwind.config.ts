import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // OPEN ITEM: confirm hex values with client. Extracted from rucaconsulting.com (2026-08-18).
        brand: {
          DEFAULT: "rgb(var(--color-brand) / <alpha-value>)",
          dark: "rgb(var(--color-brand-dark) / <alpha-value>)",
          light: "rgb(var(--color-brand-light) / <alpha-value>)",
        },
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        header: "rgb(var(--color-header) / <alpha-value>)",
        line: "rgb(var(--color-line) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Roboto", "Arial", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
      boxShadow: {
        cta: "0 10px 30px -12px rgb(151 71 255 / 0.55)",
      },
    },
  },
  plugins: [],
};
export default config;
