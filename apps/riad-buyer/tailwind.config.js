const tailwindConfig = require('@riad/tailwind/tailwind.config');

module.exports = {
  ...tailwindConfig,
  content: [`./src/**/*.{html,js,jsx,ts,tsx}`],

  theme: {
    ...tailwindConfig.theme,

    container: {
      center: true,
    },

    extend: {
      ...tailwindConfig.theme.extend,
    },
  },
};
