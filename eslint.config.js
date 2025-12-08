// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import cspellRecommended from '@cspell/eslint-plugin/recommended';
import prettier from 'eslint-plugin-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    plugins: {
      'jsx-a11y': jsxA11y,
      prettier,
      react,
    },

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      cspellRecommended,
      eslintPluginPrettierRecommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', '.'],
        },
        typescript: {},
      },
    },

    rules: {
      'react/require-default-props': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prefer-stateless-function': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],

      'prefer-const': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'global-require': 'off',

      'prettier/prettier': ['error'],
      'object-curly-newline': 'off',
      'padded-blocks': 'off',
      'max-len': [
        'error',
        120,
        2,
        {
          ignoreUrls: true,
          ignoreComments: false,
          ignoreRegExpLiterals: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
        },
      ],

      'max-depth': ['error', 4],
      'max-nested-callbacks': ['error', 5],
      'max-params': ['error', 4],
      complexity: ['error', 20],

      '@cspell/spellchecker': ['error'],

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: ['**/stories/**/*.*', '**/.storybook/**/*.*', 'spec/**/*.*', '*.config.*'],
          peerDependencies: true,
        },
      ],
      'import/no-unresolved': ['error', { ignore: ['^storybook/', '^vitest/', '^@vitejs/'] }],
    },
    ignores: ['*.config.js', 'lib/**/*.js', 'lib/**/*.d.ts', 'docs/**/*.js'],
  },
  {
    files: ['**/*.config.{js,ts}', '**/vitest.*.ts'],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    files: ['tests/**/*.ts'],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    files: ['spec/*.jsx'],
    rules: { 'react/prop-types': 'off' },
  },
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'no-restricted-imports': ["error", { patterns: [{ group: ["../*", "./*"]}] }]
    },
    ignores: ["src/stories/**"]
  },
  storybook.configs["flat/recommended"],
);
