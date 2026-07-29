import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        muted: "var(--muted)",
        primary: {
          DEFAULT: "#6C63FF",
          50: "#f0efff",
          100: "#e4e2ff",
          200: "#ccc9ff",
          300: "#a9a3ff",
          400: "#8a80ff",
          500: "#6C63FF",
          600: "#5a50f5",
          700: "#4c41e0",
          800: "#3d34b5",
          900: "#312a90",
        },
        accent: "#00D9FF",
        dark: {
          bg: "#0A0A0F",
          card: "#12121A",
          border: "#1E1E2E",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
