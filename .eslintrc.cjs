/* eslint-disable */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jsx-a11y', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',

    // TypeScript
    'plugin:@typescript-eslint/recommended',

    // Acessibilidade
    'plugin:jsx-a11y/recommended',

    // Importações mais limpas
    'plugin:import/recommended',
    'plugin:import/typescript',

    // Integração com prettier
    'plugin:prettier/recommended',
  ],
  rules: {
    // regra essencial para evitar conflitos de formatação
    'prettier/prettier': 'warning',

    // React 17+ não precisa importar React
    'react/react-in-jsx-scope': 'off',

    // Opcional — deixa o TS controlar props do React
    'react/prop-types': 'off',

    // Ajustes de importação (boas práticas)
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
      },
    ],
  },
}
