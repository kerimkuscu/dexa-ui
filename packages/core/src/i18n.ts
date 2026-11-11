/**
 * Messages are nested objects of strings. Every locale has the same shape as
 * `en` (enforced by the `Messages` type in @dexa-ui/locales).
 */
export interface MessageTree {
  [key: string]: string | MessageTree
}

export interface Locale {
  /** BCP 47 tag, also passed to `Intl` (dates, numbers, plural rules). */
  name: string
  /** Text direction. Arabic, Hebrew, Persian and Urdu are `rtl`. */
  dir: 'ltr' | 'rtl'
  messages: MessageTree
}

export type TranslateParams = Record<string, string | number>

function lookup(tree: MessageTree, path: string): string | undefined {
  let node: string | MessageTree | undefined = tree
  for (const key of path.split('.')) {
    if (node === undefined || typeof node === 'string') return undefined
    node = node[key]
  }
  return typeof node === 'string' ? node : undefined
}

/** Replaces `{name}` placeholders. Unknown placeholders are left untouched. */
export function interpolate(template: string, params?: TranslateParams): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in params ? String(params[key]) : match,
  )
}

export type Translate = (path: string, params?: TranslateParams) => string

/**
 * `t('common.close')`. Falls back to `fallback` (English), then to the path
 * itself, so a missing translation is visible but never crashes.
 */
export function createTranslator(locale: Locale, fallback?: Locale): Translate {
  return (path, params) => {
    const message = lookup(locale.messages, path) ?? (fallback && lookup(fallback.messages, path))
    return interpolate(message ?? path, params)
  }
}
