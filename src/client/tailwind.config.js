const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'accent-light': '#818cf8',
        'accent-dark': '#6366f1',
        background: '#1A1A28',
        'background-light': '#212132',
        'background-dark': '#10101A',
        'white-light': '#F5F5F5',
        'white-dark': '#DCDCDC',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './src/public/index.html'],
};
