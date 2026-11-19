import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { exportName, generate } from '../scripts/draw.mjs'
import * as pkg from '../src/index'
import { allIcons, iconGroups } from '../src/all'
import { iconAttrs, iconCheck, iconChevronRight, iconSvg, type IconData } from '../src/index'

const root = resolve(import.meta.dirname, '..')

describe('generated files', () => {
  const { files, svgs } = generate() as {
    files: Record<string, string>
    svgs: Record<string, string>
  }

  it('are up to date with the drawings (run `pnpm draw`)', () => {
    for (const [file, content] of Object.entries(files)) {
      expect(readFileSync(resolve(root, file), 'utf8'), file).toBe(content)
    }
    expect(readdirSync(resolve(root, 'svg')).sort()).toEqual(Object.keys(svgs).sort())
    for (const [file, content] of Object.entries(svgs)) {
      expect(readFileSync(resolve(root, 'svg', file), 'utf8'), file).toBe(content)
    }
  })
})

describe('icon set', () => {
  it('exports every icon once, under its icon* name', () => {
    const names = allIcons.map((i) => i.name)
    expect(new Set(names).size).toBe(names.length)
    for (const icon of allIcons) {
      expect(icon.name).toMatch(/^[a-z]+(-[a-z0-9]+)*$/)
      expect((pkg as Record<string, unknown>)[exportName(icon.name)]).toBe(icon)
      expect(icon.path).toMatch(/^M[\d.\s\-MmCcLlHhVvZz]+$/)
    }
    expect(iconGroups.flatMap((g) => g.icons)).toEqual(allIcons)
    expect(allIcons.length).toBeGreaterThanOrEqual(50)
  })

  it('marks only horizontal direction icons as mirrored in RTL', () => {
    const rtl = allIcons.filter((i) => i.rtl).map((i) => i.name)
    expect(rtl.sort()).toEqual(
      [
        'arrow-left',
        'arrow-right',
        'caret-left',
        'caret-right',
        'chevron-left',
        'chevron-right',
        'chevrons-left',
        'chevrons-right',
      ].sort(),
    )
  })
})

describe('iconAttrs', () => {
  it('is decorative by default', () => {
    expect(iconAttrs(iconCheck)).toEqual({
      viewBox: '0 0 24 24',
      class: 'dx-icon',
      fill: 'currentColor',
      focusable: 'false',
      'aria-hidden': 'true',
    })
  })

  it('gets an accessible name from label', () => {
    const attrs = iconAttrs(iconCheck, { label: 'Done' })
    expect(attrs.role).toBe('img')
    expect(attrs['aria-label']).toBe('Done')
    expect(attrs['aria-hidden']).toBeUndefined()
  })

  it('sizes, colors, spins and mirrors', () => {
    expect(iconAttrs(iconChevronRight, { size: 20, color: 'red', spin: true })).toMatchObject({
      class: 'dx-icon dx-icon--rtl dx-icon--spin',
      style: { fontSize: '20px', color: 'red' },
    })
    expect(iconAttrs(iconCheck, { size: '2rem' }).style).toEqual({ fontSize: '2rem' })
  })

  it('takes icons from other sets with their own viewBox', () => {
    const other: IconData = { name: 'other', path: 'M0 0h512v512H0z', viewBox: '0 0 512 512' }
    expect(iconAttrs(other).viewBox).toBe('0 0 512 512')
  })
})

describe('iconSvg', () => {
  it('renders a standalone, escaped SVG string', () => {
    const svg = iconSvg(iconCheck, { label: 'Say "hi" <b>', size: 16 })
    expect(svg).toBe(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="dx-icon" fill="currentColor" focusable="false" role="img" aria-label="Say &quot;hi&quot; &lt;b&gt;" style="font-size:16px"><path d="${iconCheck.path}"/></svg>`,
    )
  })
})
