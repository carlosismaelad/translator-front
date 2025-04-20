/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f86011",
        "new-blue": "#0697df",
        black: "#000000",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
}