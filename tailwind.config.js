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
              themeDark: '#2A363B',
              themeRed: '#CF4647',
      }
    }
  },
  plugins: [],
}
