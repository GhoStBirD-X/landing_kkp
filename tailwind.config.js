/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#3E2874', dark: '#241748', light: '#5A3FA0' },
        accent: { DEFAULT: '#C22420', dark: '#9A1B17', light: '#FF6259' }
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
