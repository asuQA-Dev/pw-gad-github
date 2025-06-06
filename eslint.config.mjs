import eslintPluginPlaywright from 'eslint-plugin-playwright';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['package-lock.json', 'playwright-report/**', 'test-results/**'],
  },
  {
    files: ['**/*.ts'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: { globals: globals.node },
  },
  {
    rules: {
      'no-console': 'error',
    },
  },
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },
  eslintPluginPlaywright.configs['flat/recommended'],
  {
    rules: {
      'playwright/no-nested-step': 'off',
    },
    settings: {
      playwright: {
        globalAliases: {
          test: ['setup'],
        },
      },
    },
  },
  tseslint.configs.recommended,

  eslintPluginPrettierRecommended,
]);
