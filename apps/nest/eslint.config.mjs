import globals from 'globals';
import tseslint from 'typescript-eslint';
import { config } from '@repo/eslint-config/index.js';
import { defineConfig } from 'eslint/config';

export default defineConfig(
  ...config,
  ...tseslint.configs.recommendedTypeChecked,
    {
      languageOptions: {
        globals: {
          ...globals.jest,
        },
        sourceType: 'commonjs',
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
    },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-call': 'off',
      'svelte/no-inner-declarations': 'off',
    },
  }
);
