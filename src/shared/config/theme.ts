import { createTheme, em } from '@mantine/core';

const theme = createTheme({
  white: '#fdfdfd',
  black: '#161616',
  colors: {},
  primaryShade: 4,
  fontFamily: 'Lato',
  breakpoints: {
    sm: em(414),
    md: em(768),
    lg: em(1280),
  },
});

export default theme;
