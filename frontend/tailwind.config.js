/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'light': '#f0f0ea',
        'dark': '#0e0e07',
        'primary': '#c7c6ae',
        'secondary': '#43605c',
        'accent': '#7e8ea5',
       },    
    },
  },
  plugins: [],
   
}

