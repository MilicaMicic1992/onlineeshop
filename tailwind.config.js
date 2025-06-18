/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'mainBlue': '#003F62',
        'mainYellow': '#EDA415',
        'lightGray': '#F4F4F4',
        'textWhite': '#fff',
        'textDark': '#222222',
        'lightBlue': '#B3D4E5',
        'grayColor': '#B6B6B6'

      }
    },
  },
  plugins: [],
}

