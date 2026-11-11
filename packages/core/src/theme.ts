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
