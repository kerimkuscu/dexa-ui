import { useCallback, useSyncExternalStore } from 'react'
import { applyTheme, getTheme, onThemeChange, type ThemeName } from '@dexa-ui/core'

const subscribe = (onChange: () => void) => onThemeChange(onChange)
const getSnapshot = (): ThemeName => getTheme() ?? 'light'
const getServerSnapshot = (): ThemeName => 'light'

/**
 * Reads and sets the theme on `<html data-theme>`. Stays in sync even when
 * the attribute is changed outside React. SSR-safe.
 */
export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const setTheme = useCallback((next: ThemeName) => applyTheme(next), [])
  return { theme, setTheme }
}
