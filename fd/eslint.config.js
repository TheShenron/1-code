import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    plugins: {
      prettier
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Prettier
      'prettier/prettier': 'error',

      // Best Practices
      eqeqeq: 'error',
      'no-eval': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'consistent-return': 'error',
      'no-param-reassign': 'error',
      'no-magic-numbers': ['error', { ignore: [0, 1, 2] }],
      'no-else-return': 'error',
      'no-use-before-define': 'error',
      complexity: ['warn', { max: 10 }],
      'max-lines': ['warn', 200],
      'max-statements': ['warn', 10],

      // ES6
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'no-useless-constructor': 'error',
      'no-this-before-super': 'error',
      'no-duplicate-imports': 'error',

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
    },

    // rules: {
    //   //perttier
    //   'prettier/prettier': 'error',
    //   // Best Practices
    //   eqeqeq: 'error', // Enforce strict equality
    //   'no-eval': 'error', // Disallow eval()
    //   'no-var': 'error', // Disallow var
    //   'prefer-const': 'error', // Prefer const over let
    //   'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    //   // 'no-unused-vars': 'error', // Disallow unused variables
    //   "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    //   'consistent-return': 'error', // Enforce consistent return behavior
    //   'no-param-reassign': 'error', // Disallow parameter reassignment
    //   'no-magic-numbers': ['error', { ignore: [0, 1, 2] }], // Disallow magic numbers
    //   'no-else-return': 'error', // Disallow else after return
    //   'no-use-before-define': 'error', // Disallow use before define
    //   complexity: ['warn', { max: 10 }], // Enforce function complexity
    //   'max-lines': ['warn', 200], // Limit file length
    //   'max-statements': ['warn', 10], // Limit statements per function

    //   // Code Style
    //   indent: ['error', 2], // Enforce 2-space indentation
    //   quotes: ['error', 'single'], // Enforce single quotes
    //   semi: ['error', 'always'], // Enforce semicolons
    //   'no-trailing-spaces': 'error', // Disallow trailing spaces
    //   'space-before-function-paren': ['error', 'never'], // No space before function parentheses
    //   'object-curly-spacing': ['error', 'always'], // Enforce spacing inside braces

    //   // ECMAScript 6
    //   'arrow-spacing': 'error', // Enforce spacing around arrow functions
    //   'prefer-arrow-callback': 'error', // Prefer arrow functions as callbacks
    //   'prefer-template': 'error', // Prefer template literals
    //   'no-useless-constructor': 'error', // Disallow unnecessary constructors
    //   'no-this-before-super': 'error', // Disallow use of this/super before calling super()
    //   'no-duplicate-imports': 'error', // Disallow duplicate imports

    //   // React Specific
    //   // 'react/jsx-uses-react': 'error', // Prevent React being marked as unused
    //   // 'react/jsx-uses-vars': 'error', // Prevent variables used in JSX being marked as unused
    //   // 'react/jsx-sort-props': ['error', { callbacksLast: true, shorthandFirst: true }], // Sort JSX props
    //   // 'react/jsx-no-duplicate-props': 'error', // Disallow duplicate props in JSX
    //   // 'react/jsx-no-bind': 'error', // Disallow JSX props spreading
    //   // 'react/jsx-pascal-case': 'error', // Enforce PascalCase for JSX components

    //   // TypeScript Specific
    //   '@typescript-eslint/no-explicit-any': 'error', // Warn on usage of any
    //   '@typescript-eslint/explicit-module-boundary-types': 'error', // Require explicit return types
    //   '@typescript-eslint/no-inferrable-types': 'error', // Warn on unnecessary type annotations
    //   '@typescript-eslint/explicit-function-return-type': 'error', // Require explicit return types on functions
    // },
  },
]);