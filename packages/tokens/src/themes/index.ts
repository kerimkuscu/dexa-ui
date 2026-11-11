import { dark } from './dark'
import { dracula } from './dracula'
import { light } from './light'
import { monokai } from './monokai'
import { nord } from './nord'
import { solarizedDark, solarizedLight } from './solarized'
import type { Theme } from './types'

export { dark, dracula, light, monokai, nord, solarizedDark, solarizedLight }
export * from './types'
export * from './derive'

/** All built-in themes. `light` is the default (applied when no `data-theme` is set). */
export const themes: readonly Theme[] = [
  light,
  dark,
  nord,
  dracula,
  monokai,
  solarizedLight,
  solarizedDark,
]

export type BuiltInThemeName =
  | 'light'
  | 'dark'
  | 'nord'
  | 'dracula'
  | 'monokai'
  | 'solarized-light'
  | 'solarized-dark'
