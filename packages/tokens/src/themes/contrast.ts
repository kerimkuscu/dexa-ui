import { contrastRatio } from '../color'
import { deriveIntent } from './derive'
import { intents, type Theme } from './types'

/** WCAG AA: 4.5:1 for text, 3:1 for UI components and placeholder text. */
export const AA_TEXT = 4.5
export const AA_UI = 3

export interface ContrastCheck {
  /** Human-readable pair, e.g. `primary.contrast on primary.hover`. */
  pair: string
  foreground: string
  background: string
  ratio: number
  required: number
  pass: boolean
}

function check(
  pair: string,
  foreground: string,
  background: string,
  required: number,
): ContrastCheck {
  const ratio = contrastRatio(foreground, background)
  return { pair, foreground, background, ratio, required, pass: ratio >= required }
}

/**
 * Runs every foreground/background pair a theme produces through WCAG AA.
 * Use it to validate custom themes: `checkThemeContrast(myTheme).filter(c => !c.pass)`.
 */
export function checkThemeContrast(theme: Theme): ContrastCheck[] {
  const c = theme.colors
  const results: ContrastCheck[] = []

  for (const [bgName, bg] of [
    ['bg', c.bg],
    ['surface', c.surface],
    ['elevated', c.elevated],
    ['muted', c.muted],
  ] as const) {
    results.push(check(`text on ${bgName}`, c.text, bg, AA_TEXT))
    results.push(check(`textMuted on ${bgName}`, c.textMuted, bg, AA_TEXT))
  }
  results.push(check('textSubtle on surface', c.textSubtle, c.surface, AA_UI))
  results.push(check('borderStrong on surface', c.borderStrong, c.surface, AA_UI))

  for (const intent of intents) {
    const d = deriveIntent(theme, intent)
    results.push(check(`${intent}.contrast on ${intent}.solid`, d.contrast, d.solid, AA_TEXT))
    results.push(check(`${intent}.contrast on ${intent}.hover`, d.contrast, d.hover, AA_TEXT))
    results.push(check(`${intent}.contrast on ${intent}.active`, d.contrast, d.active, AA_TEXT))
    results.push(check(`${intent}.text on ${intent}.subtle`, d.text, d.subtle, AA_TEXT))
    results.push(check(`${intent}.text on ${intent}.subtleHover`, d.text, d.subtleHover, AA_TEXT))
    results.push(check(`${intent}.text on surface`, d.text, c.surface, AA_TEXT))
  }

  return results
}
