/**
 * Theme-independent design tokens. Each key becomes a CSS custom property:
 * `scale.space['4']` → `--dx-space-4`.
 */
export const scale = {
  font: {
    sans: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
  },
  'font-size': {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  'font-weight': {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  'line-height': {
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.75',
  },
  space: {
    '0': '0',
    px: '1px',
    '0-5': '0.125rem',
    '1': '0.25rem',
    '1-5': '0.375rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
  },
  radius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px',
  },
  'border-width': {
    default: '1px',
    thick: '2px',
  },
  shadow: {
    sm: '0 1px 2px 0 rgb(var(--dx-shadow-color) / 0.06)',
    md: '0 2px 4px -1px rgb(var(--dx-shadow-color) / 0.08), 0 4px 8px -2px rgb(var(--dx-shadow-color) / 0.08)',
    lg: '0 4px 6px -2px rgb(var(--dx-shadow-color) / 0.06), 0 12px 24px -4px rgb(var(--dx-shadow-color) / 0.12)',
    xl: '0 8px 16px -4px rgb(var(--dx-shadow-color) / 0.1), 0 24px 48px -8px rgb(var(--dx-shadow-color) / 0.18)',
  },
  'z-index': {
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    drawer: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
    toast: '1080',
  },
  duration: {
    fast: '120ms',
    normal: '200ms',
    slow: '320ms',
  },
  ease: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
  },
  /** Form controls and buttons share these so they line up in a row. */
  'control-height': {
    sm: '1.75rem',
    md: '2.25rem',
    lg: '2.75rem',
  },
  'control-padding-x': {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
  },
  'control-font-size': {
    sm: '0.8125rem',
    md: '0.875rem',
    lg: '1rem',
  },
  'focus-ring-width': {
    default: '3px',
  },
} as const

/**
 * Breakpoints (min-width). CSS custom properties cannot be used inside media
 * queries, so these are exported for JS and mirrored as literals in the CSS.
 */
export const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  '2xl': 1400,
} as const

export type Breakpoint = keyof typeof breakpoints
export type Size = 'sm' | 'md' | 'lg'
