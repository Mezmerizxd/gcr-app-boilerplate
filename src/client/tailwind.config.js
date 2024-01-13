const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        'accent-light': '#2384FF',
        'accent-dark': '#00469E',
        background: '#0C0C0C',
        'background-light': '#1A1A1A',
        'background-dark': '#050505',
        'white-light': '#D7D7D7',
        'white-dark': '#B9B9B9',
      },
      fontFamily: {
        racing: ['Racing Sans One', ...defaultTheme.fontFamily.sans],
        romanNumber: ['Roboto Slab', ...defaultTheme.fontFamily.serif],
      },
      animation: {
        marquee: 'marquee 5s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('flowbite/plugin')],
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './src/index.html', '../../node_modules/flowbite-react/lib/esm/**/*.js'],
};
