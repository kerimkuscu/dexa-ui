import { PREFIX } from '@dexa-ui/tokens'

let counter = 0

/**
 * Fallback id generator for places with no framework id (plain JS).
 * Framework packages use their own SSR-safe ids (Vue `useId`, React `useId`).
 */
export function createId(name = 'id'): string {
  counter += 1
  return `${PREFIX}-${name}-${counter}`
}
