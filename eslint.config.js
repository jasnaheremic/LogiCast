import globals from 'globals';
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import importPlugin from 'eslint-plugin-import'; // Import the plugin
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      '@typescript-eslint': ts,
      react: react,
      import: importPlugin // Add the import plugin here
    },
    rules: {
      indent: ['error', 2],
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: 'if', next: '*' },
        { blankLine: 'always', prev: 'function', next: '*' }
      ],
      'import/order': [
        1,
        {
          groups: [
            'builtin', // Built-in imports (e.g., `fs`, `path`, etc.)
            'external', // External imports (e.g., `react`, `lodash`)
            'internal', // Internal imports (e.g., local imports or aliases like @)
            'parent', // Parent directory imports
            'sibling', // Sibling directory imports
            'index', // Index file imports (e.g., './')
            'object', // Object imports (if needed)
            'type' // Type imports
          ],
          pathGroups: [
            {
              pattern: '@/**', // Internal imports (e.g., using aliases like @/)
              group: 'internal', // These will come first
              position: 'before' // Position them before others
            },
            {
              pattern: './**', // Relative imports (e.g., './module' or '../module')
              group: 'sibling', // These will come after internal imports
              position: 'before' // Position them before external imports
            },
            {
              pattern: '**/*.css', // CSS imports
              group: 'index', // These will come last
              position: 'after'
            }
          ]
        }
      ],
      'react/jsx-equals-spacing': ['error', 'never'],
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...eslintPluginPrettierRecommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      '@typescript-eslint/no-unused-vars': ['warn']
    },
    settings: {
      react: {
        version: 'detect' // Automatically detects the React version
      }
    }
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
  {
    rules: {
      'no-console': 'off',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'avoid',
          printWidth: 120,
          semi: true,
          singleQuote: true,
          trailingComma: 'none',
          endOfLine: 'auto'
        }
      ]
    }
  }
];
