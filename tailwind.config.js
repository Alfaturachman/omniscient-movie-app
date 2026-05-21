/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#E50914',
        dark: '#141414',
        darker: '#0B0B0B',
      }
    },
  },
  plugins: [],
}
