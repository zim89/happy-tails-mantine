module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-preset-mantine': {},
    'postcss-simple-vars': {
      variables: {
        'mantine-breakpoint-sm': '414px',
        'mantine-breakpoint-md': '768px',
        'mantine-breakpoint-lg': '1280px',
      },
    },
  },
};
