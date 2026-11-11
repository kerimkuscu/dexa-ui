import type { Locale } from '@dexa-ui/core'
import type { en } from './lang/en'

type DeepStrings<T> = { [K in keyof T]: T[K] extends string ? string : DeepStrings<T[K]> }

/** Shape every locale must match: the same keys as English, any string values. */
export type Messages = DeepStrings<(typeof en)['messages']>

export interface DexaLocale extends Locale {
  messages: Messages
}
