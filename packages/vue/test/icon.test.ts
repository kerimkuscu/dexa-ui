import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { iconCheck, iconChevronRight, type IconData } from '@dexa-ui/icons'
import { DxIcon } from '../src'

describe('DxIcon', () => {
  it('renders a decorative 24-grid svg with one path', () => {
    const svg = mount(DxIcon, { props: { icon: iconCheck } })
    expect(svg.element.tagName).toBe('svg')
    expect(svg.classes()).toEqual(['dx-icon'])
    expect(svg.attributes()).toMatchObject({
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      focusable: 'false',
      'aria-hidden': 'true',
    })
    expect(svg.attributes('role')).toBeUndefined()
    expect(svg.get('path').attributes('d')).toBe(iconCheck.path)
  })

  it('has an accessible name with label', () => {
    const svg = mount(DxIcon, { props: { icon: iconCheck, label: 'Done' } })
    expect(svg.attributes('role')).toBe('img')
    expect(svg.attributes('aria-label')).toBe('Done')
    expect(svg.attributes('aria-hidden')).toBeUndefined()
  })

  it('sizes, colors, spins, mirrors and keeps extra classes', () => {
    const svg = mount(DxIcon, {
      props: { icon: iconChevronRight, size: 20, color: 'red', spin: true },
      attrs: { class: 'mine' },
    })
    expect(svg.classes()).toEqual(['dx-icon', 'dx-icon--rtl', 'dx-icon--spin', 'mine'])
    expect((svg.element as SVGElement).style.fontSize).toBe('20px')
    expect((svg.element as SVGElement).style.color).toBe('red')
  })

  it('takes icons from other sets', () => {
    const other: IconData = { name: 'box', path: 'M0 0h512v512H0z', viewBox: '0 0 512 512' }
    expect(mount(DxIcon, { props: { icon: other } }).attributes('viewBox')).toBe('0 0 512 512')
  })
})
