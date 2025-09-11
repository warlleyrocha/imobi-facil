/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      screens: {
        // Breakpoints customizados para dispositivos móveis
        xs: '320px', // iPhone SE (1ª geração)
        sm: '375px', // iPhone X/XS/11 Pro
        md: '414px', // iPhone XR/11/12/13
        lg: '480px', // Phones em landscape / tablets pequenos
        xl: '768px', // iPads
        '2xl': '1024px', // iPads Pro / Tablets grandes
      },
      fontFamily: {
        // Inter variants (nomes exatos do Expo Google Fonts)
        inter: ['Inter_400Regular'],
        'inter-light': ['Inter_300Light'],
        'inter-medium': ['Inter_500Medium'],
        'inter-semibold': ['Inter_600SemiBold'],
        'inter-bold': ['Inter_700Bold'],
        'inter-black': ['Inter_900Black'],

        // Mulish variants (nomes exatos do Expo Google Fonts)
        mulish: ['Mulish_400Regular'],
        'mulish-light': ['Mulish_300Light'],
        'mulish-medium': ['Mulish_500Medium'],
        'mulish-semibold': ['Mulish_600SemiBold'],
        'mulish-bold': ['Mulish_700Bold'],
        'mulish-black': ['Mulish_900Black'],

        // Aliases para facilitar o uso (opcional)
        primary: ['Inter_400Regular'],
        secondary: ['Mulish_400Regular'],
        heading: ['Inter_700Bold'],
        body: ['Mulish_400Regular'],
      },

      colors: {
        'cor-primaria': '#3758F9',
        'cor-primaria-10': 'rgba(55, 88, 249, 0.1)', // 10% opacity
        'cor-secundaria': '#13C296',
        stroke: '#DFE4EA',
        'dark': '#111928',
        'dark-2': '#1F2A37',
        'dark-5': '#6B7280',
        'dark-6': '#9CA3AF',
        white: '#FAFAFA',
        laranja: '#F27430',
        'texto-c-primario': '#637381',
        'texto-c-secundario': '#8899A8',
        'cor-stroke': '#DFE4EA',
      },
      sombras: {
        'sh-1': 'box-shadow: 0px 1px 3px 0px #A6AFC366',
        'sh-2': 'box-shadow: 0px 5px 12px 0px #0000001A',
        'sh-3': 'box-shadow: 0px 4px 12px 0px #0D0A2C0F',
        'sh-4': 'box-shadow: 0px 10px 15px 0px #050D1D2E',
        'sh-5': 'box-shadow: 0px 12px 34px 0px #0D0A2C14; box-shadow: 0px 34px 26px 0px #0D0A2C0D;',
        'sh-6': 'box-shadow: 0px 20px 20px 0px #050D1D33',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Plugin para estilização de formulários
  ],
};
