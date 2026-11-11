import { PREFIX } from '@dexa-ui/tokens'

export type ClassValue = string | false | null | undefined

/** Joins truthy class names: `cx('a', cond && 'b')`. */
export function cx(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}

export interface Namespace {
  /** Block: `dx-button` (or `dx-button-group` with a suffix). */
  b(suffix?: string): string
  /** Element: `dx-button__icon`. */
  e(element: string): string
  /** Modifier: `dx-button--primary`. Returns '' for empty values. */
  m(modifier: string | false | null | undefined): string
  /** Element modifier: `dx-button__icon--start`. */
  em(element: string, modifier: string): string
  /** State: `is-disabled` when `active` is true, otherwise ''. */
  is(state: string, active?: boolean): string
  /** CSS variable owned by this block: `--dx-button-height`. */
  cssVar(name: string): string
}

/**
 * BEM class helper shared by every framework package, so the same component
 * renders the same classes in Vue, React, Angular and plain HTML.
 */
export function createNamespace(block: string): Namespace {
  const base = `${PREFIX}-${block}`
  return {
    b: (suffix) => (suffix ? `${base}-${suffix}` : base),
    e: (element) => `${base}__${element}`,
    m: (modifier) => (modifier ? `${base}--${modifier}` : ''),
    em: (element, modifier) => `${base}__${element}--${modifier}`,
    is: (state, active = true) => (active ? `is-${state}` : ''),
    cssVar: (name) => `--${base}-${name}`,
  }
}
