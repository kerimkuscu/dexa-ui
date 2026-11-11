import { useMemo, useState, type ReactNode } from 'react'
import { createZIndexManager, mergeConfig, type Locale, type Size } from '@dexa-ui/core'
import { DexaContext, useDexaContext, type DexaContextValue } from './context'

export interface DxConfigProviderProps {
  locale?: Locale
  size?: Size
  /** Starts a separate overlay stack from this value. */
  zIndex?: number
  children?: ReactNode
}

/**
 * Overrides the configuration for everything inside it. Providers can be
 * nested; unset props inherit from the nearest outer provider.
 */
export function DxConfigProvider({ locale, size, zIndex, children }: DxConfigProviderProps) {
  const parent = useDexaContext()
  // Created once: a provider keeps its own overlay stack for its lifetime.
  const [ownZIndex] = useState(() =>
    zIndex === undefined ? undefined : createZIndexManager(zIndex),
  )
  const value = useMemo<DexaContextValue>(
    () => ({
      config: mergeConfig(parent.config, { locale, size, zIndex }),
      zIndex: ownZIndex ?? parent.zIndex,
    }),
    [parent, locale, size, zIndex, ownZIndex],
  )
  return <DexaContext.Provider value={value}>{children}</DexaContext.Provider>
}
