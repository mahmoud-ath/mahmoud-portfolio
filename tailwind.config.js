/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
              themeLight: '#F8F6F6',
              themeYellow: '#F5D061',
              themeDark: '#0f172a',
              themeRed: '#CF4647',
      }
    }
  },
  plugins: [],
}
