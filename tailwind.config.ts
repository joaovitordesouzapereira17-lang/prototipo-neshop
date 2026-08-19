import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta oficial Neshop — hierarquia sofisticada e controlada:
        // navy = superfícies escuras/institucionais; orange = Primary (ação
        // principal, azul profundo); blue = Accent (links, foco, seleção,
        // um tom mais claro e usado com moderação).
        navy: {
          950: "#030a1a",
          900: "#042038",
          800: "#053755",
          700: "#064e74",
        },
        // Accent — azul de interação (links, foco, chips selecionados).
        blue: {
          600: "#0090cc",
          500: "#00a3d9",
          100: "#e6f6fc",
        },
        // Primary — azul profundo institucional (CTA principal, estados ativos).
        orange: {
          600: "#053755",
          500: "#064e74",
          100: "#e9f1f5",
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
        DEFAULT: "8px",
        lg: "12px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(16,24,32,.05)",
        md: "0 4px 14px rgba(16,24,32,.08)",
        lg: "0 12px 32px rgba(16,24,32,.12)",
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
