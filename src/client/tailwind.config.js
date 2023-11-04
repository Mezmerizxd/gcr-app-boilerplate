const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'accent-light': '#f43f5e',
        'accent-dark': '#e11d48',
        background: '#1e1e1e',
        'background-light': '#2d2d2d',
        'background-dark': '#0f0f0f',
        'white-light': '#f0f0f0',
        'white-dark': '#ABABAB',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './src/public/index.html'],
};
