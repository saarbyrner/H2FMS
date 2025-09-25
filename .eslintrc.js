module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'design-system',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'design-system/no-hardcoded-colors': 'error',
    'design-system/button-variant-compliance': 'error',
    'design-system/icon-type-compliance': 'error',
    'design-system/text-casing-compliance': 'warn',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
