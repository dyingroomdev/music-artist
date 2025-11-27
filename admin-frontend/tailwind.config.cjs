// path: admin-frontend/tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#0b1224",
        electric: "#1d4ed8",
        sky: "#38bdf8"
      },
      boxShadow: {
        glow: "0 0 25px rgba(56, 189, 248, 0.25)"
      }
    }
  },
  plugins: []
};
