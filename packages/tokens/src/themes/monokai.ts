import type { Theme } from './types'

/** Based on the classic Monokai color scheme. */
export const monokai: Theme = {
  name: 'monokai',
  label: 'Monokai',
  scheme: 'dark',
  colors: {
    intents: {
      primary: { solid: '#66d9ef', contrast: '#272822' },
      secondary: { solid: '#49483e', contrast: '#f8f8f2', text: '#97968d' },
      success: { solid: '#a6e22e', contrast: '#272822' },
      warning: { solid: '#e6db74', contrast: '#272822' },
      danger: { solid: '#fd477e', contrast: '#272822' },
      info: { solid: '#ae81ff', contrast: '#272822' },
    },
    bg: '#1e1f1c',
    surface: '#272822',
    elevated: '#3e3d32',
    muted: '#3e3d32',
    text: '#f8f8f2',
    textMuted: '#cfcfc2',
    textSubtle: '#8f8b78',
    border: '#3e3d32',
    borderStrong: '#75715e',
    shadow: '0 0 0',
  },
}
