import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { DxConfigService } from '@dexa-ui/angular'

@Component({
  selector: 'pg-messages',
  template: `
    <section class="pg-section">
      <h2>Locale: {{ cfg.locale().name }}</h2>
      <p>{{ text() }}</p>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Messages {
  protected readonly cfg = inject(DxConfigService)
  private readonly keys = ['close', 'clear', 'confirm', 'cancel', 'loading', 'noData']
  protected text() {
    return this.keys.map((k) => this.cfg.t(`common.${k}`)).join(' · ')
  }
}
