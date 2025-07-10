/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Main Colors
        primary: {
          DEFAULT: '#3758F9',
        },
        orange: {
          DEFAULT: '#FF6B35',
        },

        // Text Colors
        text: {
          primary: '#637381',
          secondary: '#637381',
        },

        // Stroke Color
        stroke: {
          DEFAULT: '#DFE4EA',
        },

        // Dark Colors (baseado na paleta do Figma)
        dark: {
          1: '#1A1D21',
          2: '#2C3037',
          3: '#3E444D',
          4: '#505863',
          5: '#626C79',
          6: '#74808F',
          7: '#8694A5',
          8: '#98A6BB',
        },

        // White
        white: '#FFFFFF',

        // Grey Colors
        grey: {
          1: '#E8EAED',
          2: '#D4D7DB',
          3: '#C0C4C9',
          4: '#ACB1B7',
          5: '#989EA5',
          6: '#848B93',
          7: '#707881',
        },

        // Orange Colors
        orangeColors: {
          DEFAULT: '#FF6B35',
          dark: '#E55A2B',
          light: '#FF8A61',
          light2: '#FFB199',
          light3: '#FFD8CC',
          light4: '#FFEDE8',
          light5: '#FFF6F4',
        },

        // Red Colors
        red: {
          DEFAULT: '#FF4444',
          dark: '#E53E3E',
          light: '#FF6B6B',
          light2: '#FF9999',
          light3: '#FFC7C7',
          light4: '#FFE3E3',
          light5: '#FFF0F0',
          light6: '#FFF8F8',
        },

        // Blue Colors
        blue: {
          DEFAULT: '#3758F9',
          dark: '#2B47E6',
          light: '#5A7BFA',
          light2: '#8DA9FB',
          light3: '#C0D7FD',
          light4: '#E0EAFF',
          light5: '#F0F5FF',
        },

        // Yellow Colors
        yellow: {
          DEFAULT: '#FFD700',
          dark: '#E6C200',
          dark2: '#CC9900',
          light: '#FFE033',
          light2: '#FFEB66',
          light3: '#FFF099',
          light4: '#FFF5CC',
        },

        // Green Colors
        green: {
          DEFAULT: '#00C851',
          dark: '#00B848',
          light: '#33D570',
          light2: '#66E28F',
          light3: '#99EFAE',
          light4: '#CCF7CD',
          light5: '#E6FBE7',
          light6: '#F0FDF0',
        },
      },
    },
  },
  plugins: [],
};
