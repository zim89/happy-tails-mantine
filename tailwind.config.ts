import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // corePlugins: { preflight: false },
  theme: {
    screens: {
      sm: '414px',
      md: '768px',
      lg: '1280px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        md: '36px',
        lg: '56px',
      },
    },
    extend: {
      keyframes: {
        progress: {
          '0%': {
            transform: 'scaleX(0%)',
          },
          '100%': {
            transform: 'scaleX(100%)',
          },
        },
        loading: {
          '0%': {
            'background-position': 'initial',
          },
          '50%': {
            'background-position': '1200px 0px',
          },
          '100%': {
            'background-position': 'initial',
          },
        },
      },
      fontFamily: {
        lato: ['var(--font-lato)', 'sans-serif'],
        madi: ['var(--font-madi)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        0.5: '2px',
      },
      boxShadow: {
        card: '0 2px 8px 0px rgba(0, 0, 0, 0.16)',
      },
      colors: {
        primary: '#fdfdfd',
        secondary: '#161616',
        'brand-blue': '#4285F4',
        'brand-yellow': '#FBBC04',
        'auth-bg': '#EDE8E2',
        'brand-orange': {
          100: '#FEF4E9',
          200: '#FDEFDE',
          300: '#FBDEBB',
          400: '#F39324',
          500: '#DB8420',
          600: '#C2761D',
          700: '#B66E1B',
          800: '#925816',
          900: '#6D4210',
        },
        'brand-grey': {
          100: '#FAFAFA',
          200: '#F7F7F7',
          300: '#EEEEEE',
          400: '#C8C8C8',
          500: '#B4B4B4',
          600: '#A0A0A0',
          700: '#969696',
          800: '#787878',
          900: '#5A5A5A',
        },
        'brand-green': {
          100: '#EBF5ED',
          200: '#E1F0E4',
          300: '#C1E0C6',
          400: '#389B48',
          500: '#328C41',
          600: '#2D7C3A',
          700: '#2A7436',
          800: '#225D2B',
          900: '#194620',
        },
        'brand-red': {
          100: '#FCEBEA',
          200: '#FAE1E0',
          300: '#F4C1BE',
          400: '#DC362E',
          500: '#C63129',
          600: '#B02B25',
          700: '#A52923',
          800: '#84201C',
          900: '#631815',
        },
      },
    },
  },
  plugins: [],
};
export default config;
