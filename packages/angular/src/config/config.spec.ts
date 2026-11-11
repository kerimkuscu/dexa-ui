import { Component, inject, signal, type OnInit } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { tr } from '@dexa-ui/locales'
import type { Size } from '@dexa-ui/core'
import { DxConfigProvider } from './config-provider'
import { DxConfigService, provideDexa } from './config.service'

@Component({
  selector: 'dx-probe',
  template: `{{ cfg.locale().name }}|{{ cfg.size(size) }}|{{ cfg.t('common.close') }}`,
})
class Probe {
  readonly cfg = inject(DxConfigService)
  size?: Size
}

const seen: number[] = []

@Component({ selector: 'dx-overlay', template: '' })
class Overlay implements OnInit {
  private readonly cfg = inject(DxConfigService)
  // Like a real overlay: the z-index is taken when it opens, after inputs are bound.
  ngOnInit() {
    seen.push(this.cfg.zIndex.next())
  }
}

describe('DxConfigService', () => {
  it('defaults to English and md', () => {
    const cfg = TestBed.inject(DxConfigService)
    expect(cfg.locale().name).toBe('en')
    expect(cfg.size()).toBe('md')
    expect(cfg.t('common.close')).toBe('Close')
  })

  it('reads provideDexa()', () => {
    TestBed.configureTestingModule({ providers: [provideDexa({ locale: tr, size: 'sm' })] })
    const cfg = TestBed.inject(DxConfigService)
    expect(cfg.t('common.close')).toBe('Kapat')
    expect(cfg.size()).toBe('sm')
    expect(cfg.size('lg')).toBe('lg')
  })
})

describe('DxConfigProvider', () => {
  it('lets nested providers override and inherit', async () => {
    @Component({
      imports: [DxConfigProvider, Probe],
      template: `
        <dx-config-provider [locale]="tr">
          <dx-config-provider size="lg"><dx-probe /></dx-config-provider>
        </dx-config-provider>
      `,
    })
    class Host {
      readonly tr = tr
    }
    const fixture = TestBed.createComponent(Host)
    await fixture.whenStable()
    expect(fixture.nativeElement.textContent.trim()).toBe('tr|lg|Kapat')
  })

  it('reacts to input changes', async () => {
    @Component({
      imports: [DxConfigProvider, Probe],
      template: `<dx-config-provider [size]="size()"><dx-probe /></dx-config-provider>`,
    })
    class Host {
      readonly size = signal<Size>('sm')
    }
    const fixture = TestBed.createComponent(Host)
    await fixture.whenStable()
    expect(fixture.nativeElement.textContent.trim()).toBe('en|sm|Close')
    fixture.componentInstance.size.set('lg')
    await fixture.whenStable()
    expect(fixture.nativeElement.textContent.trim()).toBe('en|lg|Close')
  })

  it('shares a z-index stack, and starts a new one when zIndex is set', async () => {
    seen.length = 0
    @Component({
      imports: [DxConfigProvider, Overlay],
      template: `
        <dx-config-provider [zIndex]="100">
          <dx-overlay /><dx-overlay />
          <dx-config-provider [zIndex]="5000"><dx-overlay /></dx-config-provider>
        </dx-config-provider>
      `,
    })
    class Host {}
    const fixture = TestBed.createComponent(Host)
    await fixture.whenStable()
    expect(seen).toEqual([101, 102, 5001])
  })
})
