import { useCallback, useEffect, useState } from 'react'
import { applyTheme, getTheme, type ThemeName } from '@dexa-ui/core'

const listeners = new Set<(theme: ThemeName) => void>()

/**
 * Reads and sets the theme on `<html data-theme>`. Every component using the
 * hook re-renders on change. SSR-safe: the attribute is read after mount.
 */
export function useTheme() {
  const [theme, setState] = useState<ThemeName>('light')

  useEffect(() => {
    setState(getTheme() ?? 'light')
    listeners.add(setState)
    return () => {
      listeners.delete(setState)
    }
  }, [])

  const setTheme = useCallback((next: ThemeName) => {
    applyTheme(next)
    listeners.forEach((listener) => listener(next))
  }, [])

  return { theme, setTheme }
}
