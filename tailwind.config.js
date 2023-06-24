/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineClamp: {
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15'
      }
    },
  },
  plugins: [],
}

