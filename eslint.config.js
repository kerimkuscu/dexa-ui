// @ts-check
import js from '@eslint/js'
import angular from 'angular-eslint'
import prettier from 'eslint-config-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/.angular/**',
      '**/out-tsc/**',
      '**/node_modules/**',
    ],
  },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,ts,tsx,mts,vue}'],
    // Type-only imports are enforced by `verbatimModuleSyntax` in tsconfig.
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Vue
  ...vue.configs['flat/recommended'].map((config) => ({
    ...config,
    files: ['**/*.vue'],
  })),
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },

  // React
  {
    files: ['packages/react/**/*.{ts,tsx}', 'playgrounds/react/**/*.{ts,tsx}'],
    ...reactHooks.configs.flat.recommended,
  },

  // Angular
  {
    files: ['packages/angular/**/*.ts', 'playgrounds/angular/**/*.ts'],
    extends: [...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: ['dx', 'pg'], style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: ['dx', 'pg'], style: 'camelCase' },
      ],
      // Library components are named DxButton, not DxButtonComponent.
      '@angular-eslint/component-class-suffix': 'off',
    },
  },
  {
    files: ['packages/angular/**/*.html', 'playgrounds/angular/**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
  },

  prettier,
)
