import type { Size } from '@dexa-ui/tokens'
import type { Locale } from './i18n'

export interface DexaConfig {
  /** UI strings. Defaults to English. */
  locale: Locale
  /** Default size for components that accept `size`. */
  size: Size
  /** Starting z-index for overlays (modals, popovers, toasts). */
  zIndex: number
}

export type DexaConfigInput = Partial<DexaConfig>

export const DEFAULT_SIZE: Size = 'md'
export const DEFAULT_Z_INDEX = 2000

/** Inner provider values override outer ones; unset keys are inherited. */
export function mergeConfig(parent: DexaConfig, child: DexaConfigInput | undefined): DexaConfig {
  if (!child) return parent
  return {
    locale: child.locale ?? parent.locale,
    size: child.size ?? parent.size,
    zIndex: child.zIndex ?? parent.zIndex,
  }
}

/** Component prop wins, then the nearest provider, then the default. */
export function resolveSize(prop: Size | undefined, config: Pick<DexaConfig, 'size'>): Size {
  return prop ?? config.size ?? DEFAULT_SIZE
}
