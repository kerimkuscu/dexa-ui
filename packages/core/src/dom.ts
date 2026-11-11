/** True in browsers, false during SSR and in Node. */
export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'
