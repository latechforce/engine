import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier/recommended'
import boundariesPlugin from 'eslint-plugin-boundaries'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,

  {
    plugins: {
      boundaries: boundariesPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },

  // Global rules override
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },

  // Test overrides
  {
    files: ['**/*.test.ts', '**/*.test.js', '**/test/**/*', '**/spec/**/*'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },

  // Ignore output + cache dirs
  {
    ignores: ['node_modules', 'website'],
  },

  // ✅ Boundaries rules and settings in one block
  {
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    settings: {
      'boundaries/elements': [
        { type: 'interface', pattern: 'src/**/interface/**', mode: 'full' },
        { type: 'application', pattern: 'src/**/application/**', mode: 'full' },
        { type: 'domain', pattern: 'src/**/domain/**', mode: 'full' },
        { type: 'infrastructure', pattern: 'src/**/infrastructure/**', mode: 'full' },
        { type: 'client', pattern: 'src/**/client/**', mode: 'full' },
      ],
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    rules: {
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          message: '"${file.type}" is not allowed to import "${dependency.type}"',
          rules: [
            {
              from: 'client',
              allow: ['application', 'interface', 'client'],
            },
            {
              from: 'interface',
              allow: ['domain', 'application', 'infrastructure', 'interface'],
            },
            {
              from: 'infrastructure',
              allow: ['domain', 'application', 'infrastructure', 'client'],
            },
            {
              from: 'application',
              allow: ['domain', 'application'],
            },
            {
              from: 'domain',
              allow: ['domain'],
            },
          ],
        },
      ],
    },
  }
)
