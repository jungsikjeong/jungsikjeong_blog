import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.ts', '**/*.tsx'],
    excludedFiles: ['src/app/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                'src/entities/*/**',
                'src/features/*/**',
                'src/widgets/*/**',
                'src/shared/*/**',
              ],
              message:
                '직접적인 import는 허용되지 않습니다. index.tsx를 통해 import 해주세요.',
            },
          ],
          paths: [
            {
              name: 'src/entities/*',
              message: 'entities는 index.tsx를 통해서만 import 할 수 있습니다.',
            },
            {
              name: 'src/features/*',
              message: 'features는 index.tsx를 통해서만 import 할 수 있습니다.',
            },
            {
              name: 'src/widgets/*',
              message: 'widgets는 index.tsx를 통해서만 import 할 수 있습니다.',
            },
            {
              name: 'src/shared/*',
              message: 'shared는 index.tsx를 통해서만 import 할 수 있습니다.',
            },
          ],
        },
      ],
    },
  },
]

export default eslintConfig
