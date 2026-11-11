import type { BuiltInThemeName } from '@dexa-ui/tokens'
import { isClient } from './dom'

/** A built-in theme, `auto` (follows the OS light/dark setting), or a custom theme name. */
export type ThemeName = BuiltInThemeName | 'auto' | (string & {})

export const THEME_ATTRIBUTE = 'data-theme'

/** Sets `data-theme` on `target` (default: `<html>`). No-op during SSR. */
export function applyTheme(theme: ThemeName, target?: HTMLElement): void {
  if (!isClient) return
  ;(target ?? document.documentElement).setAttribute(THEME_ATTRIBUTE, theme)
}

export function getTheme(target?: HTMLElement): ThemeName | null {
  if (!isClient) return null
  return (target ?? document.documentElement).getAttribute(THEME_ATTRIBUTE)
}

export function prefersDark(): boolean {
  return isClient && window.matchMedia?.('(prefers-color-scheme: dark)').matches === true
}

/** Calls `listener` when the OS color scheme changes. Returns an unsubscribe function. */
export function onSystemSchemeChange(listener: (dark: boolean) => void): () => void {
  if (!isClient || !window.matchMedia) return () => {}
  const query = window.matchMedia('(prefers-color-scheme: dark)')
  const handler = (event: MediaQueryListEvent) => listener(event.matches)
  query.addEventListener('change', handler)
  return () => query.removeEventListener('change', handler)
}

/**
 * Calls `listener` whenever `data-theme` on `target` (default: `<html>`)
 * changes, no matter who changed it. Returns an unsubscribe function.
 */
export function onThemeChange(
  listener: (theme: ThemeName | null) => void,
  target?: HTMLElement,
): () => void {
  if (!isClient || typeof MutationObserver === 'undefined') return () => {}
  const element = target ?? document.documentElement
  const observer = new MutationObserver(() => listener(element.getAttribute(THEME_ATTRIBUTE)))
  observer.observe(element, { attributes: true, attributeFilter: [THEME_ATTRIBUTE] })
  return () => observer.disconnect()
}
