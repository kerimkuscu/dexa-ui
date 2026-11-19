import { Component, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { iconCheck, iconChevronRight, iconX, type IconData } from '@dexa-ui/icons'
import { DxIcon } from './icon'

async function render<T>(component: new () => T) {
  const fixture = TestBed.createComponent(component)
  await fixture.whenStable()
  return fixture
}

describe('DxIcon', () => {
  it('renders a decorative 24-grid svg with one path', async () => {
    @Component({ imports: [DxIcon], template: `<svg dx-icon [icon]="icon"></svg>` })
    class Host {
      icon = iconCheck
    }
    const fixture = await render(Host)
    const svg: SVGSVGElement = fixture.nativeElement.querySelector('svg')
    expect(svg.getAttribute('class')).toBe('dx-icon')
    expect(svg.getAttribute('viewBox')).toBe('0 0 24 24')
    expect(svg.getAttribute('fill')).toBe('currentColor')
    expect(svg.getAttribute('focusable')).toBe('false')
    expect(svg.getAttribute('aria-hidden')).toBe('true')
    expect(svg.hasAttribute('role')).toBe(false)
    const paths = svg.querySelectorAll('path')
    expect(paths).toHaveLength(1)
    expect(paths[0]!.namespaceURI).toBe('http://www.w3.org/2000/svg')
    expect(paths[0]!.getAttribute('d')).toBe(iconCheck.path)
  })

  it('has an accessible name with label', async () => {
    @Component({ imports: [DxIcon], template: `<svg dx-icon [icon]="icon" label="Done"></svg>` })
    class Host {
      icon = iconCheck
    }
    const svg: SVGSVGElement = (await render(Host)).nativeElement.querySelector('svg')
    expect(svg.getAttribute('role')).toBe('img')
    expect(svg.getAttribute('aria-label')).toBe('Done')
    expect(svg.hasAttribute('aria-hidden')).toBe(false)
  })

  it('sizes, colors, spins, mirrors and keeps extra classes', async () => {
    @Component({
      imports: [DxIcon],
      template: `<svg dx-icon class="mine" [icon]="icon" [size]="20" color="red" spin></svg>`,
    })
    class Host {
      icon = iconChevronRight
    }
    const svg: SVGSVGElement = (await render(Host)).nativeElement.querySelector('svg')
    expect([...svg.classList].sort()).toEqual(['dx-icon', 'dx-icon--rtl', 'dx-icon--spin', 'mine'])
    expect(svg.style.fontSize).toBe('20px')
    expect(svg.style.color).toBe('red')
  })

  it('follows a changing icon and takes icons from other sets', async () => {
    const other: IconData = { name: 'box', path: 'M0 0h512v512H0z', viewBox: '0 0 512 512' }
    @Component({ imports: [DxIcon], template: `<svg dx-icon [icon]="icon()"></svg>` })
    class Host {
      icon = signal<IconData>(iconX)
    }
    const fixture = await render(Host)
    const svg: SVGSVGElement = fixture.nativeElement.querySelector('svg')
    expect(svg.querySelector('path')!.getAttribute('d')).toBe(iconX.path)
    fixture.componentInstance.icon.set(other)
    await fixture.whenStable()
    expect(svg.getAttribute('viewBox')).toBe('0 0 512 512')
    expect(svg.querySelector('path')!.getAttribute('d')).toBe(other.path)
  })
})
