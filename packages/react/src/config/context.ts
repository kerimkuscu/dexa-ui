import { createContext, useContext } from 'react'
import {
  createZIndexManager,
  DEFAULT_SIZE,
  DEFAULT_Z_INDEX,
  type DexaConfig,
  type ZIndexManager,
} from '@dexa-ui/core'
import { en } from '@dexa-ui/locales'

export interface DexaContextValue {
  config: DexaConfig
  zIndex: ZIndexManager
}

export const defaultConfig: DexaConfig = {
  locale: en,
  size: DEFAULT_SIZE,
  zIndex: DEFAULT_Z_INDEX,
}

/** Used when the app has no provider: English, size `md`. */
export const DexaContext = createContext<DexaContextValue>({
  config: defaultConfig,
  zIndex: createZIndexManager(DEFAULT_Z_INDEX),
})

export function useDexaContext(): DexaContextValue {
  return useContext(DexaContext)
}

export function useConfig(): DexaConfig {
  return useContext(DexaContext).config
}
