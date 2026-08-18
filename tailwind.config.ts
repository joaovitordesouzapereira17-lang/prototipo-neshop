import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta oficial Neshop: fundo escuro, azul-petróleo e ciano de destaque.
        navy: {
          950: "#030a1a",
          900: "#042038",
          800: "#053755",
          700: "#064e74",
        },
        blue: {
          600: "#00b5ff",
          500: "#00b5ff",
          100: "#e0f6ff",
        },
        orange: {
          600: "#0090cc",
          500: "#00b5ff",
          100: "#e0f6ff",
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
