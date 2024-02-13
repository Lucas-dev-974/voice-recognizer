/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          "dark-blue": "#21262F",
          "blue-teal": "#123549",
          "blue": "#116EBE"
      }
    },
  },
  plugins: [],
}

