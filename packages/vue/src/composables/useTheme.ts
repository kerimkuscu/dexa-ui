import { onMounted, readonly, ref } from 'vue'
import { applyTheme, getTheme, type ThemeName } from '@dexa-ui/core'

const current = ref<ThemeName>('light')

/**
 * Reads and sets the theme on `<html data-theme>`. Shared across the app.
 * SSR-safe: the attribute is read on mount.
 */
export function useTheme() {
  onMounted(() => {
    current.value = getTheme() ?? 'light'
  })
  function setTheme(theme: ThemeName) {
    current.value = theme
    applyTheme(theme)
  }
  return { theme: readonly(current), setTheme }
}
