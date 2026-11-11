import { describe, expect, it } from 'vitest'
import { buildCss, checkThemeContrast, dark, light, themeCss, themes } from '../src'

describe('built-in themes', () => {
  it('have unique names', () => {
    const names = themes.map((t) => t.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it.each(themes.map((t) => [t.name, t] as const))('%s meets WCAG AA', (_, theme) => {
    const failures = checkThemeContrast(theme)
      .filter((c) => !c.pass)
      .map((c) => `${c.pair}: ${c.ratio.toFixed(2)} < ${c.required}`)
    expect(failures).toEqual([])
  })

  it.each(themes.map((t) => [t.name, t] as const))(
    '%s declares the same variables as light',
    (_, theme) => {
      const names = (css: string) => [...css.matchAll(/(--dx-[\w-]+):/g)].map((m) => m[1]).sort()
      expect(names(themeCss(theme))).toEqual(names(themeCss(light)))
    },
  )
})

describe('buildCss', () => {
  const css = buildCss({ defaultTheme: light, autoDarkTheme: dark, themes })

  it('applies the default theme to :root and data-theme="auto"', () => {
    expect(css).toContain(':root,\n[data-theme="light"],\n[data-theme="auto"] {')
    expect(css).toContain('@media (prefers-color-scheme: dark)')
  })

  it('emits one block per non-default theme', () => {
    for (const t of themes.filter((t) => t.name !== 'light')) {
      expect(css).toContain(`[data-theme="${t.name}"] {`)
    }
  })

  it('includes scale and derived tokens', () => {
    expect(css).toContain('--dx-space-4: 1rem;')
    expect(css).toContain('--dx-border-width: 1px;')
    expect(css).toContain(
      '--dx-color-primary-hover: color-mix(in oklab, var(--dx-color-primary), var(--dx-color-primary-shade) 12%);',
    )
  })
})
