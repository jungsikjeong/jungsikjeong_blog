import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

const config = [
  js.configs.recommended,
  ...compat.extends(
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ),
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      'import/no-unresolved': [
        'error',
        {
          ignore: [
            '^@/styles',
            '^next/',
            '^@/',
            '^@/shared/',
            '\\.css$',
            '\\.scss$',
          ],
        },
      ],
      'import/no-internal-modules': [
        'error',
        {
          allow: [
            '**/index',
            '**/index.tsx',
            '**/index.ts',
            '@/*',
            '@/shared/*',
            '@/shared/lib/*',
            '@/styles/*',
            'next/*',
            'next/font/*',
            'react-dom/client',
          ],
        },
      ],
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/entities',
              from: './src/features',
            },
            {
              target: './src/entities',
              from: './src/widgets',
            },
            {
              target: './src/entities',
              from: './src/pages',
            },
            {
              target: './src/shared',
              from: './src/entities',
            },
            {
              target: './src/shared',
              from: './src/features',
            },
            {
              target: './src/shared',
              from: './src/widgets',
            },
            {
              target: './src/shared',
              from: './src/pages',
            },
            {
              target: './src/features',
              from: './src/widgets',
            },
            {
              target: './src/features',
              from: './src/pages',
            },
            {
              target: './src/widgets',
              from: './src/pages',
            },
          ],
        },
      ],
    },
  },
]

export default config
