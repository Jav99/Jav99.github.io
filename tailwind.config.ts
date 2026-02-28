import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        pop: {
          DEFAULT: "#14B8A6",
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",
          400: "#2DD4BF",
          500: "#14B8A6",
          600: "#0D9488",
          700: "#0F766E",
        },
        surface: {
          dark: "#050508",
          card: "rgba(15, 15, 20, 0.6)",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "Cambria", "serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        clay: "0 8px 30px rgb(0 0 0 / 0.04)",
        "clay-hover": "0 12px 40px rgb(0 0 0 / 0.08)",
        "clay-lg": "0 20px 60px rgb(0 0 0 / 0.06)",
        glow: "0 0 60px rgba(20, 184, 166, 0.15)",
        "glow-lg": "0 0 120px rgba(20, 184, 166, 0.2)",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      letterSpacing: {
        editorial: "-0.04em",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        "aura-drift": "auraDrift 20s ease-in-out infinite",
        "aura-drift-reverse": "auraDriftReverse 25s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        auraDrift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 15px) scale(0.95)" },
        },
        auraDriftReverse: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-25px, 20px) scale(0.97)" },
          "66%": { transform: "translate(15px, -25px) scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
