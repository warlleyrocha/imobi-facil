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
      },
      sombras: {
        'sh-1': 'box-shadow: 0px 1px 3px 0px #A6AFC366',
        'sh-2': 'box-shadow: 0px 5px 12px 0px #0000001A',
        'sh-3': 'box-shadow: 0px 4px 12px 0px #0D0A2C0F',
        'sh-4': 'box-shadow: 0px 10px 15px 0px #050D1D2E',
        'sh-5': 'box-shadow: 0px 12px 34px 0px #0D0A2C14; box-shadow: 0px 34px 26px 0px #0D0A2C0D;',
        'sh-6': 'box-shadow: 0px 20px 20px 0px #050D1D33'
      }
    },
  },
  plugins: [],
};
