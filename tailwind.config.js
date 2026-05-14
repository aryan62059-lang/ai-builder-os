/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 80px rgba(0,0,0,0.35)",
        neon: "0 0 24px rgba(56,189,248,0.28), 0 0 64px rgba(168,85,247,0.18)",
        card: "0 18px 44px rgba(0,0,0,0.24)",
      },
      colors: {
        ink: {
          950: "#080a12",
          900: "#0d111c",
          850: "#111626",
          800: "#161d2f",
          700: "#202941",
          500: "#66708b",
          300: "#b7c0d6",
          100: "#edf2ff",
        },
        ember: "#f59e0b",
        mint: "#34d399",
        skyfire: "#38bdf8",
        blood: {
          950: "#120105",
          900: "#210208",
          700: "#6f0615",
          500: "#ff1744",
          400: "#ff3b3b",
          300: "#ff7070",
        },
      },
      backgroundImage: {
        "dashboard-radial":
          "radial-gradient(circle at 12% 8%, rgba(255,23,68,0.2), transparent 30%), radial-gradient(circle at 86% 4%, rgba(255,255,255,0.08), transparent 26%), radial-gradient(circle at 70% 88%, rgba(255,59,59,0.14), transparent 24%), linear-gradient(135deg, #020203 0%, #09090b 48%, #140207 100%)",
        "neon-line":
          "linear-gradient(90deg, rgba(255,23,68,0), rgba(255,23,68,0.92), rgba(255,255,255,0.8), rgba(255,23,68,0))",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.72" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
