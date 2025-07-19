/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'cor-primaria': '#3758F9',
        'laranja': '#F27430',
        'texto-c-primario': '#637381',
        'texto-c-secundario': '#8899A8',
        'cor-stroke': '#DFE4EA'
      }
    },
  },
  plugins: [],
};
