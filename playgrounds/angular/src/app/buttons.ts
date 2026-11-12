import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { DxButton, DxButtonGroup } from '@dexa-ui/angular'
import { buttonVariants, intents, sizes } from '../../../shared/demo'

@Component({
  selector: 'pg-buttons',
  imports: [DxButton, DxButtonGroup],
  template: `
    <section class="pg-section">
      <h2>Buttons</h2>
      @for (variant of variants; track variant) {
        <div class="pg-row">
          @for (intent of intents; track intent) {
            <button dx-button [intent]="intent" [variant]="variant">{{ intent }}</button>
          }
        </div>
      }
      <div class="pg-row">
        @for (size of sizes; track size) {
          <button dx-button [size]="size">Size {{ size }}</button>
        }
        <button dx-button pill>Pill</button>
        <button dx-button iconOnly aria-label="Add">+</button>
        <button dx-button [loading]="loading()" (click)="save()">
          <span dx-start>★</span>Save
        </button>
        <button dx-button disabled>Disabled</button>
        <a dx-button href="#" variant="outline" intent="secondary">Link</a>
      </div>
      <div class="pg-row">
        <dx-button-group aria-label="Alignment" variant="outline" intent="secondary">
          <button dx-button>Left</button>
          <button dx-button>Center</button>
          <button dx-button>Right</button>
        </dx-button-group>
        <dx-button-group aria-label="Actions">
          <button dx-button>One</button>
          <button dx-button>Two</button>
          <button dx-button>Three</button>
        </dx-button-group>
        <dx-button-group dir="rtl" aria-label="RTL" variant="soft">
          <button dx-button>يمين</button>
          <button dx-button>وسط</button>
          <button dx-button>يسار</button>
        </dx-button-group>
        <dx-button-group vertical aria-label="Vertical" variant="outline" intent="secondary">
          <button dx-button>Top</button>
          <button dx-button>Bottom</button>
        </dx-button-group>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Buttons {
  protected readonly variants = buttonVariants
  protected readonly intents = intents
  protected readonly sizes = sizes
  protected readonly loading = signal(false)

  protected save() {
    this.loading.set(true)
    setTimeout(() => this.loading.set(false), 1500)
  }
}
