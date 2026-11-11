import { intents, themes } from '@dexa-ui/tokens'

export const themeOptions = [
  ...themes.map((t) => ({ value: t.name, label: t.label })),
  { value: 'auto', label: 'Auto (OS)' },
]
export { intents }

/** Inline styles for one intent swatch: solid, hover, subtle with intent text. */
export function swatchStyles(intent: string) {
  const v = (name: string) => `var(--dx-color-${intent}${name})`
  return {
    solid: { background: v(''), color: v('-contrast') },
    hover: { background: v('-hover'), color: v('-contrast') },
    subtle: { background: v('-subtle'), color: v('-text') },
  }
}

export const surfaces = [
  { name: 'bg', style: { background: 'var(--dx-bg)' } },
  { name: 'surface', style: { background: 'var(--dx-bg-surface)' } },
  { name: 'elevated', style: { background: 'var(--dx-bg-elevated)' } },
  { name: 'muted', style: { background: 'var(--dx-bg-muted)' } },
]
