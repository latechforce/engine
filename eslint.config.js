import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    ignores: ['**/dist/**', 'node_modules'],
  },
  {
    overrides: [
      {
        files: ['./tests/**/*.{ts,tsx}'],
        rules: {
          '@typescript-eslint/no-explicit-any': 'off', // Allow "any" type in tests
        },
      },
    ],
  }
)
