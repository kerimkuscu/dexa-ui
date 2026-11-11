import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core'
import { isPlatformBrowser } from '@angular/common'
import { applyTheme, getTheme, type ThemeName } from '@dexa-ui/core'

/** Reads and sets the theme on `<html data-theme>`. SSR-safe. */
@Injectable({ providedIn: 'root' })
export class DxThemeService {
  private readonly current = signal<ThemeName>('light')
  readonly theme = this.current.asReadonly()

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.current.set(getTheme() ?? 'light')
    }
  }

  set(theme: ThemeName): void {
    this.current.set(theme)
    applyTheme(theme)
  }
}
