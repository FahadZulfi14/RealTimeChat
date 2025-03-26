/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'black-dark': '#00000050',
        'dull-white': '#FFFFFFB3',
        'white-light': '#00000030',
        'white-medium': '#FFFFFF40',
        'neon-blue': '#2FB8FF',
       
      },
      
    },
  },
  
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),

  ],
   
}


