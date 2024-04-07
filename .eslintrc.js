export default {
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  rules: {
    "no-throw-literal": "off",
    "@typescript-eslint/no-throw-literal": "error"
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
