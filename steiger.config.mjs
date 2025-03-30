import { defineConfig } from 'steiger'
import fsd from '@feature-sliced/steiger-plugin'

export default defineConfig([
  // 기본 권장 규칙을 가져옴
  ...fsd.configs.recommended,

  // 프로젝트 전체에 적용되는 규칙 재정의
  {
    files: ['./src/**'],
    rules: {
      // 금지된 가져오기 규칙 강화 (에러 레벨)
      'fsd/forbidden-imports': 'error',

      // 슬라이스 과도 분할 방지 규칙 (경고 레벨로 설정)
      'fsd/excessive-slicing': [
        'warn',
        {
          maxUngroupedSlices: 7, // 그룹화되지 않은 최대 슬라이스 수
          maxSlicesInGroup: 5, // 그룹당 최대 슬라이스 수
        },
      ],

      // 공개 API 사용 강제 (에러 레벨)
      'fsd/public-api': 'error',

      // 공개 API 우회 방지 (에러 레벨)
      'fsd/no-public-api-sidestep': 'error',

      // 목적에 따른 세그먼트 사용 권장 (경고 레벨)
      'fsd/segments-by-purpose': 'warn',

      // 불필요한 슬라이스 방지 (경고 레벨)
      'fsd/insignificant-slice': 'warn',

      // 일관된 명명 규칙 (에러 레벨)
      'fsd/inconsistent-naming': 'error',

      // 반복적인 명명 방지 (에러 레벨)
      'fsd/repetitive-naming': 'error',

      // 레이어 이름의 오타 방지 (에러 레벨)
      'fsd/typo-in-layer-name': 'error',

      // 세그먼트 없는 슬라이스 방지 (에러 레벨)
      'fsd/no-segmentless-slices': 'error',

      // Processes 레이어 사용 금지 (에러 레벨)
      'fsd/no-processes': 'error',
    },
  },

  // Shared 레이어에 대한 특별 규칙
  {
    files: ['./src/shared/**'],
    rules: {
      // Shared 레이어에서는 공개 API 규칙 비활성화
      'fsd/public-api': 'off',

      // shared/lib 모듈 그룹화 규칙 (경고 레벨)
      'fsd/shared-lib-grouping': [
        'warn',
        {
          maxUngroupedModules: 10, // 그룹화되지 않은 최대 모듈 수
        },
      ],
    },
  },

  // widgets 레이어에 대한 특별 규칙
  {
    files: ['./src/widgets/**'],
    rules: {
      // widgets에서는 과도한 슬라이스 분할 허용 (비활성화)
      'fsd/excessive-slicing': 'off',
    },
  },

  // 실험 또는 임시 코드에 대한 규칙 완화
  {
    files: ['./src/temp/**', './src/experiments/**'],
    rules: {
      // 모든 FSD 규칙 비활성화
      'fsd/forbidden-imports': 'off',
      'fsd/public-api': 'off',
      'fsd/no-public-api-sidestep': 'off',
      'fsd/no-segmentless-slices': 'off',
      'fsd/no-reserved-folder-names': 'off',
    },
  },

  // 테스트 파일에 대한 규칙 조정
  {
    files: ['./src/**/*.test.*', './src/**/__tests__/**'],
    rules: {
      // 테스트에서는 금지된 가져오기 허용
      'fsd/forbidden-imports': 'off',
      // 테스트에서는 공개 API 우회 허용
      'fsd/no-public-api-sidestep': 'off',
    },
  },

  // 특정 패턴의 파일 무시
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.next/**',
      '**/coverage/**',
      '**/public/**',
      '**/storybook-static/**',
      '**/*.stories.*',
      '**/__mocks__/**',
      '**/mocks/**',
    ],
  },
])
