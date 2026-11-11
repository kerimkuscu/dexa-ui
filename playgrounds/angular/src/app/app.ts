import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core'
import { DxConfigProvider, DxThemeService } from '@dexa-ui/angular'
import { en, tr } from '@dexa-ui/locales'
import { intents, surfaces, swatchStyles, themeOptions } from '../../../shared/demo'
import { Messages } from './messages'

@Component({
  selector: 'pg-root',
  imports: [DxConfigProvider, Messages],
  template: `
    <dx-config-provider [locale]="locale()">
      <main class="pg">
        <header class="pg-bar">
          <h1>dexa-ui · Angular</h1>
          <select aria-label="Theme" [value]="theme.theme()" (change)="setTheme($event)">
            @for (t of themeOptions; track t.value) {
              <option [value]="t.value">{{ t.label }}</option>
            }
          </select>
          <select aria-label="Language" [value]="lang()" (change)="setLang($event)">
            <option value="en">English</option>
            <option value="tr">Türkçe</option>
          </select>
        </header>

        <pg-messages />

        <section class="pg-section">
          <h2>Intents</h2>
          <div class="pg-grid">
            @for (intent of intents; track intent) {
              <div class="pg-swatch">
                <div [style]="swatch(intent).solid">{{ intent }}</div>
                <div [style]="swatch(intent).hover">hover</div>
                <div [style]="swatch(intent).subtle">subtle</div>
              </div>
            }
          </div>
        </section>

        <section class="pg-section pg-surfaces">
          <h2>Surfaces</h2>
          <div class="pg-grid">
            @for (s of surfaces; track s.name) {
              <div [style]="s.style">
                {{ s.name }}<br />
                <small style="color: var(--dx-text-muted)">muted text</small><br />
                <small style="color: var(--dx-text-subtle)">subtle text</small>
              </div>
            }
          </div>
        </section>
      </main>
    </dx-config-provider>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly theme = inject(DxThemeService)
  protected readonly lang = signal<'en' | 'tr'>('en')
  protected readonly locale = computed(() => (this.lang() === 'tr' ? tr : en))
  protected readonly themeOptions = themeOptions
  protected readonly intents = intents
  protected readonly surfaces = surfaces
  protected readonly swatch = swatchStyles

  protected setTheme(event: Event) {
    this.theme.set((event.target as HTMLSelectElement).value)
  }

  protected setLang(event: Event) {
    this.lang.set((event.target as HTMLSelectElement).value as 'en' | 'tr')
  }
}
