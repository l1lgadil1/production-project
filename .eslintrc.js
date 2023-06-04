module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: ['standard-with-typescript', 'plugin:react/recommended', 'plugin:storybook/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    project: './tsconfig.json'
  },
  plugins: ['react', '@typescript-eslint', 'i18next'],
  rules: {
    'react/jsx-indent': [2, 4],
    'react/jsx-indent-props': [2, 4],
    // indent: ['error', 4, { SwitchCase: 1, ignoredNodes: ['PropertyDefinition'] }],
    indent: 'off',
    'i18next/no-literal-string': ['error', {
      markupOnly: true
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'react/jsx-filename-extension': [2, {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }],
    'import-no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'warn',
    '@typescript-eslint/naming-convention': 'off',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    'no-underscore-dangle': 'off',
    ' @typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    "max-len": ['error', {
      ignoreComments: true,
      code: 100
    }]
  },
  globals: {
    __IS_DEV__: true
  }
};