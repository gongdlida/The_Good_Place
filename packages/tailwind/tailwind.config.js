const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  plugins: [
    ({ addComponents }) => {
      addComponents({
        '.btn-xl-submit-filled': {
          '@apply rounded bg-orange-300 px-2.5 py-4 text-white text-L/Bold': {},
        },
        '.btn-xl-submit-outlined': {
          '@apply rounded bg-white py-4 border-orange-300 text-L/Bold text-orange-500 border':
            {},
        },
      });
    },
  ],
  theme: {
    screens: {
      xl: { max: '1440px' },
      lg: { max: '992px' },
      md: { max: '768px' },
      sm: { max: '576px' },
      xs: { max: '430px' },
    },

    extend: {
      //색상
      colors: {
        orange: {
          50: '#FFFBFA',
          100: '#FFF5F0',
          200: '#FFDAC8',
          300: '#FFA378',
          400: '#FF6C28',
          500: '#FF5100',
          600: '#E64900',
          700: '#D54400',
          800: '#B83A00',
          900: '#9E2F00',
        },

        grey: {
          50: '#FCFCFC',
          100: '#F8F8F8',
          200: '#F5F5F5',
          300: '#EBEBEB',
          400: '#D9D9D9',
          500: '#BFBFBF',
          600: '#A8A8A8',
          700: '#8C8C8C',
          800: '#595959',
          900: '#262626',
        },

        blue: {
          100: '#E1F7EC',
          200: '#D7EEFF',
          300: '#ABDCFF',
          400: '#78CBFF',
          500: '#40B6FF',
          600: '#1A9CFF',
          700: '#0279D4',
          800: '#095796',
          900: '#1C476B',
        },

        green: {
          100: '#E1F7EC',
          200: '#C9F5DF',
          300: '#93EDBF',
          400: '#64E8A4',
          500: '#35DB80',
          600: '#15BD66',
          700: '#18A352',
          800: '#187A41',
          900: '#16592D',
        },

        red: {
          100: '#FDF0F2',
          200: '#FDE1E4',
          300: '#FCC5CB',
          400: '#FF96A3',
          500: '#FF697A',
          600: '#FF334B',
          700: '#E5172F',
          800: '#C9162B',
          900: '#85101E',
        },

        yellow: {
          100: '#FCF6CF',
          200: '#FBEEA6',
          300: '#F9E46C',
          400: '#F8CB32',
          500: '#F4B60D',
          600: '#E18700',
          700: '#AC6600',
          800: '#864300',
          900: '#592500',
        },
      },

      //폰트 설정
      fontSize: {
        '4XL/Bold': [' 48px', { fontWeight: 700, lineHeight: '60px' }],
        '4XL/Medium': ['48px', { fontWeight: 500, lineHeight: '60px' }],
        '4XL/Regular': ['48px', { fontWeight: 400, lineHeight: '60px' }],
        '4XL/Light': ['48px', { fontWeight: 400, lineHeight: '60px' }],

        '3XL/Bold': ['32px', { fontWeight: 700, lineHeight: '40px' }],
        '3XL/Medium': ['32px', { fontWeight: 500, lineHeight: '40px' }],
        '3XL/Regular': ['32px', { fontWeight: 400, lineHeight: '40px' }],
        '3XL/Light': ['32px', { fontWeight: 400, lineHeight: '40px' }],

        '2XL/Bold': ['24px', { fontWeight: 700, lineHeight: '32px' }],
        '2XL/Medium': ['24px', { fontWeight: 500, lineHeight: '32px' }],
        '2XL/Regular': ['24px', { fontWeight: 400, lineHeight: '32px' }],
        '2XL/Light': ['24px', { fontWeight: 400, lineHeight: '32px' }],

        'XL/Bold': ['20px', { fontWeight: 700, lineHeight: '28px' }],
        'XL/Medium': ['20px', { fontWeight: 500, lineHeight: '28px' }],
        'XL/Regular': ['20px', { fontWeight: 400, lineHeight: '28px' }],
        'XL/Light': ['20px', { fontWeight: 300, lineHeight: '28px' }],

        'L/Bold': ['18px', { fontWeight: 700, lineHeight: '26px' }],
        'L/Medium': ['18px', { fontWeight: 500, lineHeight: '26px' }],
        'L/Regular': ['18px', { fontWeight: 400, lineHeight: '26px' }],
        'L/Light': ['18px', { fontWeight: 300, lineHeight: '26px' }],

        'M/Bold': ['16px', { fontWeight: 700, lineHeight: '24px' }],
        'M/Medium': ['16px', { fontWeight: 500, lineHeight: '24px' }],
        'M/Regular': ['16px', { fontWeight: 400, lineHeight: '24px' }],
        'M/Light': ['16px', { fontWeight: 300, lineHeight: '24px' }],

        'S/Bold': ['14px', { fontWeight: 700, lineHeight: '20px' }],
        'S/Medium': ['14px', { fontWeight: 500, lineHeight: '20px' }],
        'S/Regular': ['14px', { fontWeight: 400, lineHeight: '20px' }],
        'S/Light': ['14px', { fontWeight: 300, lineHeight: '20px' }],

        'XS/Bold': ['12px', { fontWeight: 700, lineHeight: '16px' }],
        'XS/Medium': ['12px', { fontWeight: 500, lineHeight: '16px' }],
        'XS/Regular': ['12px', { fontWeight: 400, lineHeight: '16px' }],
        'XS/Light': ['12px', { fontWeight: 300, lineHeight: '16px' }],

        '2XS/Bold': ['10px', { fontWeight: 700, lineHeight: '12px' }],
        '2XS/Medium': ['10px', { fontWeight: 500, lineHeight: '12px' }],
        '2XS/Regular': ['10px', { fontWeight: 400, lineHeight: '12px' }],
        '2XS/Light': ['10px', { fontWeight: 300, lineHeight: '12px' }],
      },
    },
  },
};
