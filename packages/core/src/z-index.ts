import { DEFAULT_Z_INDEX } from './config'

export interface ZIndexManager {
  /** Returns a z-index above every previously opened overlay. */
  next(): number
  /** Highest z-index handed out so far. */
  current(): number
}

/**
 * Overlays opened later stack above earlier ones regardless of DOM order.
 * Shared per app (one manager per provider root).
 */
export function createZIndexManager(base = DEFAULT_Z_INDEX): ZIndexManager {
  let counter = 0
  return {
    next: () => base + ++counter,
    current: () => base + counter,
  }
}
