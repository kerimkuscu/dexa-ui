import { TestBed } from '@angular/core/testing'
import { DxThemeService } from './theme.service'

afterEach(() => document.documentElement.removeAttribute('data-theme'))

describe('DxThemeService', () => {
  it('sets data-theme and follows outside changes', async () => {
    const service = TestBed.inject(DxThemeService)
    expect(service.theme()).toBe('light')

    service.set('nord')
    expect(document.documentElement.dataset['theme']).toBe('nord')
    await new Promise((r) => setTimeout(r))
    expect(service.theme()).toBe('nord')

    document.documentElement.setAttribute('data-theme', 'dracula')
    await new Promise((r) => setTimeout(r))
    expect(service.theme()).toBe('dracula')
  })
})
