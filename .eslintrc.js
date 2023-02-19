module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    semi: ['error', 'never'],
    '@typescript-eslint/semi': ['error', 'never'],
    'comma-dangle': ['error', 'never'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    quotes: ['error', 'single'],
    'import/no-cycle': 0,
    'react/prop-types': 0,
    'max-len': ['error', { code: 150 }],
    'import/prefer-default-export': ['off', { target: 'any' }],
    'default-param-last': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'linebreak-style': 0
  }
}
