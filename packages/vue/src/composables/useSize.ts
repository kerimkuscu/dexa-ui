import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { resolveSize, type Size } from '@dexa-ui/core'
import { useConfig } from '../config/context'

/** Component `size` prop, falling back to the provider's size. */
export function useSize(prop: MaybeRefOrGetter<Size | undefined>) {
  const config = useConfig()
  return computed(() => resolveSize(toValue(prop), config.value))
}
