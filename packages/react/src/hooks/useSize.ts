import { resolveSize, type Size } from '@dexa-ui/core'
import { useConfig } from '../config/context'

/** Component `size` prop, falling back to the provider's size. */
export function useSize(prop: Size | undefined): Size {
  return resolveSize(prop, useConfig())
}
