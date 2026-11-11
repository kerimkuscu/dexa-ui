import { computed } from 'vue'
import { createTranslator, type TranslateParams } from '@dexa-ui/core'
import { en } from '@dexa-ui/locales'
import { useConfig } from '../config/context'

/** Current locale, text direction and a translate function (falls back to English). */
export function useLocale() {
  const config = useConfig()
  const locale = computed(() => config.value.locale)
  const translate = computed(() => createTranslator(locale.value, en))
  return {
    locale,
    dir: computed(() => locale.value.dir),
    t: (path: string, params?: TranslateParams) => translate.value(path, params),
  }
}
