import type { Theme } from './types'

export const light: Theme = {
  name: 'light',
  label: 'Light',
  scheme: 'light',
  colors: {
    intents: {
      primary: { solid: '#2563eb', contrast: '#ffffff' },
      secondary: { solid: '#475569', contrast: '#ffffff' },
      success: { solid: '#15803d', contrast: '#ffffff' },
      warning: { solid: '#f59e0b', contrast: '#0f172a', text: '#8c6337' },
      danger: { solid: '#dc2626', contrast: '#ffffff' },
      info: { solid: '#0e7490', contrast: '#ffffff' },
    },
    bg: '#ffffff',
    surface: '#ffffff',
    elevated: '#ffffff',
    muted: '#f1f5f9',
    text: '#0f172a',
    textMuted: '#475569',
    textSubtle: '#64748b',
    border: '#e2e8f0',
    borderStrong: '#8492a6',
    shadow: '15 23 42',
  },
}
