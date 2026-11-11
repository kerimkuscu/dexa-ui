import { onMounted, onScopeDispose, readonly, ref } from 'vue'
import { applyTheme, getTheme, onThemeChange, type ThemeName } from '@dexa-ui/core'

/**
 * Reads and sets the theme on `<html data-theme>`. Stays in sync even when
 * the attribute is changed outside Vue. SSR-safe: the attribute is read on mount.
 */
export function useTheme() {
  const theme = ref<ThemeName>('light')
  let stop: (() => void) | undefined

  onMounted(() => {
    theme.value = getTheme() ?? 'light'
    stop = onThemeChange((next) => (theme.value = next ?? 'light'))
  })
  onScopeDispose(() => stop?.())

  return { theme: readonly(theme), setTheme: (next: ThemeName) => applyTheme(next) }
}
