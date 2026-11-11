import type { Theme } from './types'

export const dark: Theme = {
  name: 'dark',
  label: 'Dark',
  scheme: 'dark',
  colors: {
    intents: {
      primary: { solid: '#2563eb', contrast: '#ffffff' },
      secondary: { solid: '#64748b', contrast: '#ffffff' },
      success: { solid: '#15803d', contrast: '#ffffff' },
      warning: { solid: '#f59e0b', contrast: '#0b0f17' },
      danger: { solid: '#dc2626', contrast: '#ffffff' },
      info: { solid: '#0e7490', contrast: '#ffffff' },
    },
    bg: '#0b0f17',
    surface: '#111827',
    elevated: '#1a2232',
    muted: '#1e293b',
    text: '#e2e8f0',
    textMuted: '#94a3b8',
    textSubtle: '#7c8aa0',
    border: '#1f2937',
    borderStrong: '#5b6b82',
    shadow: '0 0 0',
  },
}
