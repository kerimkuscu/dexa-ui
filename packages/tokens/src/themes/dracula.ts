import type { Theme } from './types'

/** Based on the Dracula palette (draculatheme.com, MIT). */
export const dracula: Theme = {
  name: 'dracula',
  label: 'Dracula',
  scheme: 'dark',
  colors: {
    intents: {
      primary: { solid: '#bd93f9', contrast: '#21222c' },
      secondary: { solid: '#44475a', contrast: '#f8f8f2', text: '#9799a2' },
      success: { solid: '#50fa7b', contrast: '#21222c' },
      warning: { solid: '#f1fa8c', contrast: '#21222c' },
      danger: { solid: '#ff5555', contrast: '#21222c' },
      info: { solid: '#8be9fd', contrast: '#21222c' },
    },
    bg: '#21222c',
    surface: '#282a36',
    elevated: '#343746',
    muted: '#44475a',
    text: '#f8f8f2',
    textMuted: '#c5c8d6',
    textSubtle: '#8b93b8',
    border: '#44475a',
    borderStrong: '#6272a4',
    shadow: '0 0 0',
  },
}
