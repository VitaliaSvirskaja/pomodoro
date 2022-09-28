/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      primary:{
        DEFAULT:'#7E88CA',
        dark:'#6672B9',
        light: '#EDEEF5'
      },
    },
    extend: {
      backgroundImage:{
        "home-background": "url('src/assets/pomodoro-background.jpg')"
      }
    },
  },
  plugins: [],
}