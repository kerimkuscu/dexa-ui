import { createRef } from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { iconCheck, iconChevronRight, type IconData } from '@dexa-ui/icons'
import { DxIcon } from '../src'

describe('DxIcon', () => {
  it('renders a decorative 24-grid svg with one path', () => {
    const { container } = render(<DxIcon icon={iconCheck} />)
    const svg = container.querySelector('svg')!
    expect(svg.getAttribute('class')).toBe('dx-icon')
    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24')
    expect(svg.getAttribute('fill')).toBe('currentColor')
    expect(svg.getAttribute('focusable')).toBe('false')
    expect(svg.getAttribute('aria-hidden')).toBe('true')
    expect(svg.hasAttribute('role')).toBe(false)
    expect(svg.hasAttribute('style')).toBe(false)
    expect(svg.querySelector('path')!.getAttribute('d')).toBe(iconCheck.path)
  })

  it('has an accessible name with label', () => {
    const { getByRole } = render(<DxIcon icon={iconCheck} label="Done" />)
    const svg = getByRole('img', { name: 'Done' })
    expect(svg.hasAttribute('aria-hidden')).toBe(false)
  })

  it('sizes, colors, spins, mirrors and merges className, style and ref', () => {
    const ref = createRef<SVGSVGElement>()
    const { container } = render(
      <DxIcon
        ref={ref}
        icon={iconChevronRight}
        size={20}
        color="red"
        spin
        className="mine"
        style={{ opacity: 0.5 }}
        data-x="1"
      />,
    )
    const svg = container.querySelector('svg')!
    expect(ref.current).toBe(svg)
    expect(svg.getAttribute('class')).toBe('dx-icon dx-icon--rtl dx-icon--spin mine')
    expect(svg.style.fontSize).toBe('20px')
    expect(svg.style.color).toBe('red')
    expect(svg.style.opacity).toBe('0.5')
    expect(svg.dataset.x).toBe('1')
  })

  it('takes icons from other sets', () => {
    const other: IconData = { name: 'box', path: 'M0 0h512v512H0z', viewBox: '0 0 512 512' }
    const { container } = render(<DxIcon icon={other} />)
    expect(container.querySelector('svg')!.getAttribute('viewBox')).toBe('0 0 512 512')
  })
})
