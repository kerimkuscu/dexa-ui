import type { Theme } from './types'

/** Based on Solarized by Ethan Schoonover (MIT). */
export const solarizedLight: Theme = {
  name: 'solarized-light',
  label: 'Solarized Light',
  scheme: 'light',
  colors: {
    intents: {
      primary: { solid: '#207ab9', contrast: '#ffffff' },
      secondary: { solid: '#586e75', contrast: '#ffffff' },
      success: { solid: '#859900', contrast: '#002b36', text: '#4c6b3b' },
      warning: { solid: '#b58900', contrast: '#002b36', text: '#6a643b' },
      danger: { solid: '#dc322f', contrast: '#ffffff' },
      info: { solid: '#2aa198', contrast: '#002b36', text: '#196d6f' },
    },
    bg: '#eee8d5',
    surface: '#fdf6e3',
    elevated: '#fdf6e3',
    muted: '#eee8d5',
    text: '#073642',
    textMuted: '#576c73',
    textSubtle: '#657b83',
    border: '#e4dcc4',
    borderStrong: '#819294',
    shadow: '0 43 54',
  },
}

export const solarizedDark: Theme = {
  name: 'solarized-dark',
  label: 'Solarized Dark',
  scheme: 'dark',
  colors: {
    intents: {
      primary: { solid: '#3c93d6', contrast: '#002b36', text: '#7daacc' },
      secondary: { solid: '#586e75', contrast: '#ffffff', text: '#919f9f' },
      success: { solid: '#859900', contrast: '#002b36', text: '#9cac76' },
      warning: { solid: '#b58900', contrast: '#002b36', text: '#b5a576' },
      danger: { solid: '#dc322f', contrast: '#ffffff', text: '#d68c82' },
      info: { solid: '#2aa198', contrast: '#002b36', text: '#7bb0ab' },
    },
    bg: '#00212b',
    surface: '#002b36',
    elevated: '#073642',
    muted: '#073642',
    text: '#93a1a1',
    textMuted: '#8b9b9d',
    textSubtle: '#657b83',
    border: '#073642',
    borderStrong: '#657b83',
    shadow: '0 0 0',
  },
}
