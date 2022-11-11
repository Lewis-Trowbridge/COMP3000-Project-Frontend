module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  ignorePatterns: [
    'node_modules/**',
    'dist/**',
    'parcel-cache/**',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
  ],
  rules: {
    'react/react-in-jsx-scope': 0,
    semi: [1, 'never'],
    'sort-keys': 2,
  },
}
