// path: frontend/tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0b1020",
        electric: "#1d4ed8",
        ocean: "#0ea5e9"
      },
      boxShadow: {
        glow: "0 0 25px rgba(14, 165, 233, 0.25)"
      }
    }
  },
  plugins: []
};
