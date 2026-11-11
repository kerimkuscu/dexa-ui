import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core'
import type { Locale, Size } from '@dexa-ui/core'
import { DxConfigService } from './config.service'

/**
 * Overrides the configuration for everything inside it. Providers can be
 * nested; unset inputs inherit from the nearest outer provider.
 * Renders with `display: contents`, so it does not affect layout.
 */
@Component({
  selector: 'dx-config-provider',
  template: '<ng-content />',
  providers: [DxConfigService],
  host: { style: 'display: contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxConfigProvider {
  readonly locale = input<Locale>()
  readonly size = input<Size>()
  readonly zIndex = input<number>()

  constructor() {
    inject(DxConfigService, { self: true }).setOverrides(
      computed(() => ({ locale: this.locale(), size: this.size(), zIndex: this.zIndex() })),
    )
  }
}
