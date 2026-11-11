import { DestroyRef, inject, Injectable, PLATFORM_ID, signal } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { applyTheme, getTheme, onThemeChange, type ThemeName } from '@dexa-ui/core'

/**
 * Reads and sets the theme on `<html data-theme>`. Stays in sync even when
 * the attribute is changed outside Angular. SSR-safe.
 */
@Injectable({ providedIn: 'root' })
export class DxThemeService {
  private readonly current = signal<ThemeName>('light')
  readonly theme = this.current.asReadonly()

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return
    this.current.set(getTheme() ?? 'light')
    const stop = onThemeChange((theme) => this.current.set(theme ?? 'light'))
    inject(DestroyRef).onDestroy(stop)
  }

  set(theme: ThemeName): void {
    applyTheme(theme)
  }
}
