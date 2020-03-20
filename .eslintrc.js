module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true
      }
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    env: {
      browser: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended'
    ],
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 0
    },
    settings: {
      react: {
        pragma: 'React',  // Pragma to use, default to React
        version: 'detect', // React version. detect automatically picks the version you have installed.
                             // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
                             // default to latest and warns if missing
                             // It will default to detect in the future
      }
    }
  };
