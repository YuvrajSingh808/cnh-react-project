/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "mont": ['Montserrat', 'sans-serif']
      },
      colors: {
        primary: '#5113b5',
      }
    },
  },
  plugins: [],
}

