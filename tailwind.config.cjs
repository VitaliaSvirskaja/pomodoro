/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "home-background": "url('src/assets/pomodoro-background.jpg')"
      }
    },
  },
  plugins: [],
}