import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#0b1f33",
          900: "#0f2c47",
          800: "#15406b",
          700: "#1c5490",
        },
        blue: {
          600: "#1f6fb8",
          500: "#2f8ada",
          100: "#e8f2fb",
        },
        orange: {
          600: "#e0651a",
          500: "#f2791f",
          100: "#fdecdc",
        },
        ink: {
          900: "#101820",
          700: "#33404a",
          500: "#5b6a74",
          300: "#8a97a1",
        },
        line: "#e1e6ea",
        "line-soft": "#edf0f3",
        bg: "#f6f8fa",
        green: {
          600: "#25a25a",
        },
        star: "#f2a71b",
      },
      borderRadius: {
        DEFAULT: "10px",
        lg: "16px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(16,24,32,.06)",
        md: "0 6px 20px rgba(16,24,32,.08)",
        lg: "0 16px 40px rgba(16,24,32,.14)",
      },
      maxWidth: {
        wrap: "1240px",
      },
      spacing: {
        "4.5": "1.125rem",
        "5.5": "1.375rem",
        "6.5": "1.625rem",
        "7.5": "1.875rem",
        "8.5": "2.125rem",
        "9.5": "2.375rem",
        "13": "3.25rem",
        "15": "3.75rem",
        "17": "4.25rem",
        "17.5": "4.375rem",
        "18": "4.5rem",
        "18.5": "4.625rem",
      },
    },
  },
  plugins: [],
};

export default config;
