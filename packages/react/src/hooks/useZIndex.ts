import { useDexaContext } from '../config/context'

/** `next()` returns a z-index above every overlay opened before. */
export function useZIndex() {
  return useDexaContext().zIndex
}
