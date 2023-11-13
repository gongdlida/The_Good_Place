const baseConfig = require('./eslint-base');

/** eslint react 기본 preset */
module.exports = {
  ...baseConfig,
  globals: {
    // 'JSX' is not defined. 대응
    JSX: true,
    // React 키워드 global 사용
    React: true,
    // RequestInit 키워드 global 사용
    RequestInit: true,
  },
  extends: [
    ...baseConfig.extends,
    'airbnb',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  // ESLint 사용을 위해 지원하려는 Javascript 언어 옵션
  parserOptions: {
    ecmaVersion: 2021, //  사용할 ECMAScript 버전
    sourceType: 'module', // parser 의  export  형태를 설정
    ecmaFeatures: {
      // ECMScript 규격의 JSX 사용 여부
      jsx: true,
    },
  },
  // 사전 정의된 전역 변수 사용을 정의
  // browser, node 설정을 하지 않으면  console, require
  // 같은 사전에 정의된 전역변수 환경에 있는  static  메서드를 인식할 수 없어 에러가 발생한다.
  env: {
    browser: true,
    node: true,
    'jest/globals': true,
  },
  plugins: [
    'react-hooks',
    'jest',
    'prettier',
    'simple-import-sort',
    '@typescript-eslint',
  ],
  rules: {
    ...baseConfig.rules,
    'linebreak-style': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-unused-vars': 'off', // typescript 의 no-unused-vars 만 설정, enum/interface/type의 경우 린트 warn 이나 error가 나면 안됨
    'no-nested-ternary': 'off', //  중첩된 삼항식을 허용
    'no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
    'no-console': ['warn', { allow: ['info', 'error', 'warn'] }],
    'react/jsx-one-expression-per-line': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off', // Anchor used as a button.
    'react/no-unused-prop-types': 'warn',
    'import/prefer-default-export': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/react-in-jsx-scope': 'off',
    'no-use-before-define': ['off', { variables: false }],
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/function-component-definition': 'off',
    'import/no-cycle': 'off',
    'jsx-quotes': 'off',
    'object-curly-newline': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'max-len': 'off',
    'arrow-body-style': 'off',
    'react/display-name': 'off',
    'react/jsx-props-no-spreading': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'react/jsx-curly-newline': 'off',
    'function-paren-newline': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-param-reassign': ['error', { props: false }],
    'react/jsx-wrap-multilines': [
      'error',
      { arrow: true, return: true, declaration: true },
    ],
    'eol-last': 'warn',
    'react/no-array-index-key': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/indent': 'off',
    'react/jsx-closing-tag-location': 'off',
    'operator-linebreak': 'off',
    'quote-props': 'off',
    'react/destructuring-assignment': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': 'error',
    'no-plusplus': 'off',
  },
};
