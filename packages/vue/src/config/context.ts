import { computed, inject, type ComputedRef, type InjectionKey } from 'vue'
import {
  createZIndexManager,
  DEFAULT_SIZE,
  DEFAULT_Z_INDEX,
  type DexaConfig,
  type ZIndexManager,
} from '@dexa-ui/core'
import { en } from '@dexa-ui/locales'

export interface DexaContext {
  config: ComputedRef<DexaConfig>
  zIndex: ZIndexManager
}

export const DEXA_CONTEXT: InjectionKey<DexaContext> = Symbol('dexa-ui')

export const defaultConfig: DexaConfig = {
  locale: en,
  size: DEFAULT_SIZE,
  zIndex: DEFAULT_Z_INDEX,
}

let fallbackContext: DexaContext | undefined

/** Context used when the app has no provider and no `createDexa()` plugin. */
function getFallbackContext(): DexaContext {
  fallbackContext ??= {
    config: computed(() => defaultConfig),
    zIndex: createZIndexManager(DEFAULT_Z_INDEX),
  }
  return fallbackContext
}

export function useDexaContext(): DexaContext {
  return inject(DEXA_CONTEXT, getFallbackContext, true)
}

export function useConfig(): ComputedRef<DexaConfig> {
  return useDexaContext().config
}
