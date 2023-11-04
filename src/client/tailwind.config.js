const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'accent-light': '#f43f5e',
        'accent-dark': '#e11d48',
        background: '#1c1917',
        'background-light': '#292524',
        'background-dark': '#0c0a09',
        'white-light': '#F0F0F0',
        'white-dark': '#ABABAB',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
