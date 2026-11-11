import { describe, expect, it } from 'vitest'
import { createTranslator } from '@dexa-ui/core'
import * as locales from '../src'

type Tree = { [key: string]: string | Tree }

function keys(tree: Tree, prefix = ''): string[] {
  return Object.entries(tree).flatMap(([k, v]) =>
    typeof v === 'string' ? [`${prefix}${k}`] : keys(v, `${prefix}${k}.`),
  )
}

const all = Object.values(locales)

describe('locales', () => {
  it.each(all.map((l) => [l.name, l] as const))('%s has exactly the English keys', (_, locale) => {
    expect(keys(locale.messages).sort()).toEqual(keys(locales.en.messages).sort())
  })

  it.each(all.map((l) => [l.name, l] as const))('%s has no empty strings', (_, locale) => {
    const t = createTranslator(locale)
    for (const key of keys(locale.messages)) expect(t(key).trim()).not.toBe('')
  })

  it('translates Turkish', () => {
    expect(createTranslator(locales.tr, locales.en)('common.cancel')).toBe('İptal')
  })
})
