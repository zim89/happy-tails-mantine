import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/modules/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  corePlugins: { preflight: false },
  theme: {
    screens: {
      sm: '414px',
      md: '768px',
      lg: '1280px',
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '20px',
        md: '36px',
        lg: '56px',
      },
    },
    extend: {
      fontFamily: {
        lato: ['var(--font-lato)'],
      },
      colors: {
        primary: '#fdfdfd',
        secondary: '#161616',
        // orange: {
        //   100: '#FDF0EB',
        //   200: '#FCE9E1',
        //   300: '#F8D1C1',
        //   400: '#E86936',
        //   500: '#D15F31',
        //   600: '#BA542B',
        //   700: '#AE4F29',
        //   800: '#8B3F20',
        //   900: '#682F18',
        // },
        // gray: {
        //   100: '#FAFAFA',
        //   200: '#F7F7F7',
        //   300: '#EEEEEE',
        //   400: '#C8C8C8',
        //   500: '#B4B4B4',
        //   600: '#A0A0A0',
        //   700: '#969696',
        //   800: '#787878',
        //   900: '#5A5A5A',
        // },
        // green: {
        //   100: '#EBF5ED',
        //   200: '#E1F0E4',
        //   300: '#C1E0C6',
        //   400: '#389B48',
        //   500: '#328C41',
        //   600: '#2D7C3A',
        //   700: '#2A7436',
        //   800: '#225D2B',
        //   900: '#194620',
        // },
        // red: {
        //   100: '#FCEBEA',
        //   200: '#FAE1E0',
        //   300: '#F4C1BE',
        //   400: '#DC362E',
        //   500: '#C63129',
        //   600: '#B02B25',
        //   700: '#A52923',
        //   800: '#84201C',
        //   900: '#631815',
        // },
      },
    },
  },
  plugins: [],
};
export default config;
