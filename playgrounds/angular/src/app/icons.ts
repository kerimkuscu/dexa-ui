import { ChangeDetectionStrategy, Component } from '@angular/core'
import { DxIcon } from '@dexa-ui/angular'
import { iconArrowRight, iconCheck, iconChevronRight, iconSpinner } from '@dexa-ui/icons'
import { allIcons, iconSizes, intents } from '../../../shared/demo'

@Component({
  selector: 'pg-icons',
  imports: [DxIcon],
  template: `
    <section class="pg-section">
      <h2>Icons</h2>
      <div class="pg-row">
        @for (size of iconSizes; track size) {
          <svg dx-icon [icon]="check" [size]="size"></svg>
        }
        @for (intent of intents; track intent) {
          <svg dx-icon [icon]="check" [size]="24" [color]="'var(--dx-color-' + intent + ')'"></svg>
        }
        <svg dx-icon [icon]="spinner" spin label="Loading" [size]="24"></svg>
        <span>Inline <svg dx-icon [icon]="check"></svg> with text</span>
        <span dir="rtl"
          >RTL <svg dx-icon [icon]="chevronRight"></svg> <svg dx-icon [icon]="arrowRight"></svg
        ></span>
      </div>
      <div class="pg-icons">
        @for (icon of allIcons; track icon.name) {
          <div class="pg-icon">
            <svg dx-icon [icon]="icon"></svg>
            {{ icon.name }}
          </div>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Icons {
  protected readonly allIcons = allIcons
  protected readonly iconSizes = iconSizes
  protected readonly intents = intents
  protected readonly check = iconCheck
  protected readonly spinner = iconSpinner
  protected readonly chevronRight = iconChevronRight
  protected readonly arrowRight = iconArrowRight
}
