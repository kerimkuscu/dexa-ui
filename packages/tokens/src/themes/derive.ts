import { luminance, mix } from '../color'
import { intents, type Intent, type Theme } from './types'

/**
 * Mixing weights for the colors derived from each intent's `solid` color.
 * The same numbers drive the generated CSS (`color-mix`) and the contrast tests,
 * so what is tested is exactly what the browser renders.
 */
export const deriveWeights = {
  /** Share of the shade color mixed into `solid` on hover / active. */
  hover: 0.12,
  active: 0.22,
  /** Share of `solid` in the subtle background (mixed with `surface`). */
  subtle: 0.14,
  subtleHover: 0.22,
  /** Share of `solid` in the subtle border (mixed with `surface`). */
  subtleBorder: 0.45,
  /** Share of `solid` in text drawn on the subtle background (mixed with `text`). */
  text: 0.6,
} as const

/**
 * Hover/active states move the solid color away from its contrast color,
 * so the text on top never loses contrast.
 */
export function shadeFor(contrast: string): string {
  return luminance(contrast) > 0.5 ? '#000000' : '#ffffff'
}

export interface DerivedIntent {
  solid: string
  contrast: string
  hover: string
  active: string
  subtle: string
  subtleHover: string
  subtleBorder: string
  text: string
}

export function deriveIntent(theme: Theme, intent: Intent): DerivedIntent {
  const { solid, contrast, text: textOverride } = theme.colors.intents[intent]
  const { surface, text } = theme.colors
  const shade = shadeFor(contrast)
  return {
    solid,
    contrast,
    hover: mix(solid, shade, 1 - deriveWeights.hover),
    active: mix(solid, shade, 1 - deriveWeights.active),
    subtle: mix(solid, surface, deriveWeights.subtle),
    subtleHover: mix(solid, surface, deriveWeights.subtleHover),
    subtleBorder: mix(solid, surface, deriveWeights.subtleBorder),
    text: textOverride ?? mix(solid, text, deriveWeights.text),
  }
}

export function deriveTheme(theme: Theme): Record<Intent, DerivedIntent> {
  return Object.fromEntries(intents.map((i) => [i, deriveIntent(theme, i)])) as Record<
    Intent,
    DerivedIntent
  >
}
