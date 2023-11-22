const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'accent-light': '#ea580c',
        'accent-dark': '#c2410c',
        background: '#e7e5e4',
        'background-light': '#f5f5f4',
        'background-dark': '#d6d3d1',
        'white-light': '#1c1917',
        'white-dark': '#0c0a09',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './src/public/index.html'],
};
