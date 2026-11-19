/**
 * An icon: one SVG path, filled with `currentColor`.
 *
 * The icons of this package use a 24 × 24 grid. Icons from other sets work
 * too: pass their path and their `viewBox`.
 */
export interface IconData {
  /** Kebab-case name, e.g. `chevron-down`. */
  readonly name: string
  /** SVG path data. */
  readonly path: string
  /** Defaults to `0 0 24 24`. */
  readonly viewBox?: string
  /** Points along the reading direction: mirrored in right-to-left layouts. */
  readonly rtl?: boolean
}
