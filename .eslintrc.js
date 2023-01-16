module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/semi': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
}
