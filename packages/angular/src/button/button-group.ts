import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  InjectionToken,
  input,
  type Signal,
} from '@angular/core'
import {
  buttonGroupClass,
  type ButtonGroupOptions,
  type ButtonVariant,
  type Intent,
  type Size,
} from '@dexa-ui/core'

/** Provided by `<dx-button-group>` to the buttons inside it. */
export const DX_BUTTON_GROUP = new InjectionToken<Signal<ButtonGroupOptions>>('DX_BUTTON_GROUP')

/**
 * Joins buttons into one control. `intent`, `variant`, `size` and `disabled`
 * apply to every button inside unless a button sets its own.
 * Give it an `aria-label` describing the group.
 */
@Component({
  selector: 'dx-button-group',
  template: '<ng-content />',
  host: { role: 'group', '[class]': 'classes()' },
  // Runs lazily in the group's own injector, when a button asks for it.
  providers: [{ provide: DX_BUTTON_GROUP, useFactory: () => inject(DxButtonGroup).options }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxButtonGroup {
  readonly intent = input<Intent>()
  readonly variant = input<ButtonVariant>()
  readonly size = input<Size>()
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly vertical = input(false, { transform: booleanAttribute })

  readonly options: Signal<ButtonGroupOptions> = computed(() => ({
    intent: this.intent(),
    variant: this.variant(),
    size: this.size(),
    disabled: this.disabled(),
  }))

  protected readonly classes = computed(() => buttonGroupClass({ vertical: this.vertical() }))
}
