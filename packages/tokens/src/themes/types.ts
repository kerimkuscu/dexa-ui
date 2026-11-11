export const intents = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const

export type Intent = (typeof intents)[number]

export interface IntentColor {
  /** Solid fill (buttons, badges, checked controls). */
  solid: string
  /** Text/icon color drawn on top of `solid`. */
  contrast: string
  /**
   * Text color used on the intent's subtle background and for colored text
   * (links, alerts). Derived from `solid` and the theme text color when omitted.
   */
  text?: string
}

export interface ThemeColors {
  intents: Record<Intent, IntentColor>
  /** Page background. */
  bg: string
  /** Cards, inputs, panels. */
  surface: string
  /** Popovers, dropdowns, modals. */
  elevated: string
  /** Subtle fill: hover rows, tracks, disabled backgrounds. */
  muted: string
  text: string
  textMuted: string
  /** Placeholders and disabled text. */
  textSubtle: string
  /** Dividers and card outlines. */
  border: string
  /** Form control outlines; meets 3:1 against `surface`. */
  borderStrong: string
  /** Shadow color as an `R G B` triplet, e.g. `15 23 42`. */
  shadow: string
}

export interface Theme {
  /** Value used in `data-theme="<name>"`. */
  name: string
  label: string
  scheme: 'light' | 'dark'
  colors: ThemeColors
}
