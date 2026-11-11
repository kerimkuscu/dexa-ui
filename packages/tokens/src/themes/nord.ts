import type { Theme } from './types'

/** Based on the Nord palette (nordtheme.com, MIT). */
export const nord: Theme = {
  name: 'nord',
  label: 'Nord',
  scheme: 'dark',
  colors: {
    intents: {
      primary: { solid: '#88c0d0', contrast: '#2e3440', text: '#b7d6e1' },
      secondary: { solid: '#4c566a', contrast: '#eceff4', text: '#afb5c0' },
      success: { solid: '#a3be8c', contrast: '#2e3440', text: '#c5d6be' },
      warning: { solid: '#ebcb8b', contrast: '#2e3440' },
      danger: { solid: '#b55b64', contrast: '#ffffff', text: '#dab5ba' },
      info: { solid: '#81a1c1', contrast: '#2e3440', text: '#bcccde' },
    },
    bg: '#2e3440',
    surface: '#3b4252',
    elevated: '#434c5e',
    muted: '#434c5e',
    text: '#eceff4',
    textMuted: '#d8dee9',
    textSubtle: '#9aa5b8',
    border: '#434c5e',
    borderStrong: '#808da5',
    shadow: '0 0 0',
  },
}
