import { Component, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { tr } from '@dexa-ui/locales'
import { DxConfigProvider } from '../config/config-provider'
import { DxButton } from './button'
import { DxButtonGroup } from './button-group'

/** Angular orders host classes its own way: compare them as sets. */
const classesOf = (el: Element) => [...el.classList].sort()
const sorted = (classes: string) => classes.split(' ').sort()

async function render<T>(component: new () => T) {
  const fixture = TestBed.createComponent(component)
  await fixture.whenStable()
  return fixture
}

describe('DxButton', () => {
  it('renders a primary solid md button of type "button"', async () => {
    @Component({ imports: [DxButton], template: `<button dx-button class="mine">Save</button>` })
    class Host {}
    const fixture = await render(Host)
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button')
    expect(classesOf(button)).toEqual(
      sorted('mine dx-button dx-button--primary dx-button--solid dx-button--md'),
    )
    expect(button.getAttribute('type')).toBe('button')
    expect(button.textContent?.trim()).toBe('Save')
  })

  it('applies intent, variant, size and shape', async () => {
    @Component({
      imports: [DxButton],
      template: `<button dx-button intent="danger" variant="outline" size="lg" pill block>
        Delete
      </button>`,
    })
    class Host {}
    const fixture = await render(Host)
    expect(classesOf(fixture.nativeElement.querySelector('button'))).toEqual(
      sorted(
        'dx-button dx-button--danger dx-button--outline dx-button--lg dx-button--pill dx-button--block',
      ),
    )
  })

  it('runs (click), but not when disabled or loading', async () => {
    @Component({
      imports: [DxButton],
      template: `<button
        dx-button
        [disabled]="disabled()"
        [loading]="loading()"
        (click)="clicks = clicks + 1"
      >
        Go
      </button>`,
    })
    class Host {
      clicks = 0
      readonly disabled = signal(false)
      readonly loading = signal(false)
    }
    const fixture = await render(Host)
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button')
    button.click()
    expect(fixture.componentInstance.clicks).toBe(1)

    fixture.componentInstance.disabled.set(true)
    await fixture.whenStable()
    expect(button.hasAttribute('disabled')).toBe(true)
    button.click()

    fixture.componentInstance.disabled.set(false)
    fixture.componentInstance.loading.set(true)
    await fixture.whenStable()
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(fixture.componentInstance.clicks).toBe(1)
  })

  it('stays focusable while loading and announces it', async () => {
    @Component({ imports: [DxButton], template: `<button dx-button loading>Save</button>` })
    class Host {}
    const fixture = await render(Host)
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button')
    expect(button.hasAttribute('disabled')).toBe(false)
    expect(button.getAttribute('aria-disabled')).toBe('true')
    expect(button.getAttribute('aria-busy')).toBe('true')
    expect(button.querySelector('.dx-button__spinner')).not.toBeNull()
    expect(button.querySelector('.dx-button__sr')?.textContent).toBe('Loading')
  })

  it('translates the loading text', async () => {
    @Component({
      imports: [DxButton, DxConfigProvider],
      template: `<dx-config-provider [locale]="tr"
        ><button dx-button loading>Save</button></dx-config-provider
      >`,
    })
    class Host {
      readonly tr = tr
    }
    const fixture = await render(Host)
    expect(fixture.nativeElement.querySelector('.dx-button__sr').textContent).toBe('Yükleniyor')
  })

  it('projects dx-start and dx-end around the label', async () => {
    @Component({
      imports: [DxButton],
      template: `<button dx-button><i dx-end>b</i>Label<i dx-start>a</i></button>`,
    })
    class Host {}
    const fixture = await render(Host)
    const spans = [...fixture.nativeElement.querySelectorAll('button > span')] as HTMLElement[]
    expect(spans.map((s) => `${s.className}:${s.textContent}`)).toEqual([
      'dx-button__icon dx-button__icon--start:a',
      'dx-button__label:Label',
      'dx-button__icon dx-button__icon--end:b',
    ])
  })

  it('works on links and disables them without a native attribute', async () => {
    @Component({
      imports: [DxButton],
      template: `<a dx-button href="/docs" [disabled]="disabled()" (click)="clicks = clicks + 1"
        >Docs</a
      >`,
    })
    class Host {
      clicks = 0
      readonly disabled = signal(true)
    }
    const fixture = await render(Host)
    const a: HTMLAnchorElement = fixture.nativeElement.querySelector('a')
    expect(a.hasAttribute('type')).toBe(false)
    expect(a.hasAttribute('disabled')).toBe(false)
    expect(a.getAttribute('aria-disabled')).toBe('true')
    expect(a.getAttribute('tabindex')).toBe('-1')
    expect(a.classList.contains('is-disabled')).toBe(true)
    a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    expect(fixture.componentInstance.clicks).toBe(0)
  })

  it('takes its size from the provider', async () => {
    @Component({
      imports: [DxButton, DxConfigProvider],
      template: `<dx-config-provider size="sm"><button dx-button>Go</button></dx-config-provider>`,
    })
    class Host {}
    const fixture = await render(Host)
    expect(fixture.nativeElement.querySelector('button').classList).toContain('dx-button--sm')
  })
})

describe('DxButtonGroup', () => {
  it('passes intent, variant, size and disabled to its buttons', async () => {
    @Component({
      imports: [DxButton, DxButtonGroup],
      template: `
        <dx-button-group intent="secondary" variant="outline" size="sm" disabled aria-label="Align">
          <button dx-button>Left</button>
          <button dx-button variant="solid">Right</button>
        </dx-button-group>
      `,
    })
    class Host {}
    const fixture = await render(Host)
    const group: HTMLElement = fixture.nativeElement.querySelector('dx-button-group')
    expect(group.getAttribute('role')).toBe('group')
    expect(group.getAttribute('aria-label')).toBe('Align')
    expect(group.className).toBe('dx-button-group')
    const [first, second] = [...group.querySelectorAll('button')]
    expect(classesOf(first!)).toEqual(
      expect.arrayContaining(['dx-button--secondary', 'dx-button--outline', 'dx-button--sm']),
    )
    expect(classesOf(second!)).toContain('dx-button--solid')
    expect(first!.hasAttribute('disabled')).toBe(true)
  })

  it('can be vertical', async () => {
    @Component({ imports: [DxButtonGroup], template: `<dx-button-group vertical />` })
    class Host {}
    const fixture = await render(Host)
    expect(fixture.nativeElement.querySelector('dx-button-group').className).toBe(
      'dx-button-group dx-button-group--vertical',
    )
  })
})
