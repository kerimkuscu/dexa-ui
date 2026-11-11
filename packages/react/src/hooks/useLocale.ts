import { useMemo } from 'react'
import { createTranslator } from '@dexa-ui/core'
import { en } from '@dexa-ui/locales'
import { useConfig } from '../config/context'

/** Current locale, text direction and a translate function (falls back to English). */
export function useLocale() {
  const { locale } = useConfig()
  return useMemo(
    () => ({ locale, dir: locale.dir, t: createTranslator(locale, en) }),
    [locale],
  )
}
