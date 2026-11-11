import { describe, expect, it } from 'vitest'
import {
  createNamespace,
  createTranslator,
  createZIndexManager,
  cx,
  interpolate,
  mergeConfig,
  resolveSize,
  type DexaConfig,
  type Locale,
} from '../src'

describe('createNamespace', () => {
  const ns = createNamespace('button')

  it('builds BEM classes with the dx prefix', () => {
    expect(ns.b()).toBe('dx-button')
    expect(ns.b('group')).toBe('dx-button-group')
    expect(ns.e('icon')).toBe('dx-button__icon')
    expect(ns.m('primary')).toBe('dx-button--primary')
    expect(ns.em('icon', 'start')).toBe('dx-button__icon--start')
    expect(ns.cssVar('height')).toBe('--dx-button-height')
  })

  it('returns empty strings for inactive modifiers and states', () => {
    expect(ns.m(undefined)).toBe('')
    expect(ns.is('disabled', false)).toBe('')
    expect(ns.is('disabled')).toBe('is-disabled')
  })
})

describe('cx', () => {
  it('drops falsy values', () => {
    expect(cx('a', false, null, undefined, '', 'b')).toBe('a b')
  })
})

describe('i18n', () => {
  const en: Locale = {
    name: 'en',
    dir: 'ltr',
    messages: { common: { hi: 'Hi {name}', only: 'EN' } },
  }
  const tr: Locale = { name: 'tr', dir: 'ltr', messages: { common: { hi: 'Merhaba {name}' } } }

  it('interpolates params and keeps unknown placeholders', () => {
    expect(interpolate('{a} and {b}', { a: 1 })).toBe('1 and {b}')
  })

  it('translates, falls back to English, then to the key', () => {
    const t = createTranslator(tr, en)
    expect(t('common.hi', { name: 'Kerim' })).toBe('Merhaba Kerim')
    expect(t('common.only')).toBe('EN')
    expect(t('common.missing')).toBe('common.missing')
    expect(t('common')).toBe('common')
  })
})

describe('config', () => {
  const root: DexaConfig = {
    locale: { name: 'en', dir: 'ltr', messages: {} },
    size: 'md',
    zIndex: 2000,
  }

  it('merges child over parent, inheriting unset keys', () => {
    expect(mergeConfig(root, { size: 'lg' })).toEqual({ ...root, size: 'lg' })
    expect(mergeConfig(root, undefined)).toBe(root)
  })

  it('resolves size: prop, then config', () => {
    expect(resolveSize('sm', root)).toBe('sm')
    expect(resolveSize(undefined, root)).toBe('md')
  })
})

describe('createZIndexManager', () => {
  it('hands out increasing values above the base', () => {
    const z = createZIndexManager(100)
    expect(z.next()).toBe(101)
    expect(z.next()).toBe(102)
    expect(z.current()).toBe(102)
  })
})
