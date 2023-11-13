const path = require('path');
const baseConfig = require('@riad/eslint/eslintPreset');

module.exports = {
  ...baseConfig,
  settings: {
    'import/resolver': {
      // this loads <rootdir>/tsconfig.json to eslint
      typescript: {
        project: path.resolve(`${__dirname}/tsconfig.json`),
      },
    },
  },
};
