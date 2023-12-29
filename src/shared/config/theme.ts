import { createTheme, em } from '@mantine/core';

const theme = createTheme({
  white: '#fdfdfd',
  black: '#161616',
  colors: {},
  primaryShade: 4,
  // defaultRadius: 'sm',
  fontFamily: 'Lato',
  breakpoints: {
    xs: em(414),
    md: em(768),
    xl: em(1280),
  },
});

export default theme;
