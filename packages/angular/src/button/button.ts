import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
} from '@angular/core'
import {
  buttonA11y,
  buttonClass,
  isButtonInert,
  resolveButton,
  type ButtonType,
  type ButtonVariant,
  type Intent,
  type Size,
} from '@dexa-ui/core'
import { DxConfigService } from '../config/config.service'
import { DX_BUTTON_GROUP } from './button-group'

/**
 * `<button dx-button>` or `<a dx-button>` (works with `routerLink`).
 * Icons: put `dx-start` or `dx-end` on the element to place it before or
 * after the label. Inside a `<dx-button-group>` it inherits the group's
 * intent, variant, size and disabled state unless it sets its own.
 */
@Component({
  selector: 'button[dx-button], a[dx-button]',
  template: `
    @if (loading()) {
      <span class="dx-button__spinner" aria-hidden="true"></span>
      <span class="dx-button__sr">{{ config.t('common.loading') }}</span>
    }
    <span class="dx-button__icon dx-button__icon--start"><ng-content select="[dx-start]" /></span>
    <span class="dx-button__label"><ng-content /></span>
    <span class="dx-button__icon dx-button__icon--end"><ng-content select="[dx-end]" /></span>
  `,
  host: {
    '[class]': 'classes()',
    '[attr.type]': 'nativeButton ? type() : null',
    '[attr.disabled]': 'a11y().disabled ? "" : null',
    '[attr.aria-disabled]': 'a11y()["aria-disabled"] ?? null',
    '[attr.aria-busy]': 'a11y()["aria-busy"] ?? null',
    '[attr.tabindex]': 'a11y().tabindex ?? null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxButton {
  readonly intent = input<Intent>()
  readonly variant = input<ButtonVariant>()
  readonly size = input<Size>()
  /** Native button type. Defaults to `button`, so it never submits a form by accident. */
  readonly type = input<ButtonType>('button')
  readonly disabled = input(false, { transform: booleanAttribute })
  /** Shows a spinner and ignores clicks; the button stays focusable. */
  readonly loading = input(false, { transform: booleanAttribute })
  readonly pill = input(false, { transform: booleanAttribute })
  /** Square, for a single icon. Give it an `aria-label`. */
  readonly iconOnly = input(false, { transform: booleanAttribute })
  readonly block = input(false, { transform: booleanAttribute })

  protected readonly config = inject(DxConfigService)
  private readonly group = inject(DX_BUTTON_GROUP, { optional: true })
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly nativeButton = this.host.tagName === 'BUTTON'

  private readonly state = computed(() =>
    resolveButton(
      {
        intent: this.intent(),
        variant: this.variant(),
        size: this.size(),
        disabled: this.disabled(),
      },
      this.group?.(),
      this.config.config(),
    ),
  )

  protected readonly a11y = computed(() =>
    buttonA11y(this.nativeButton, { disabled: this.state().disabled, loading: this.loading() }),
  )

  protected readonly classes = computed(() => {
    const { intent, variant, size, disabled } = this.state()
    return buttonClass({
      intent,
      variant,
      size,
      disabled,
      loading: this.loading(),
      pill: this.pill(),
      iconOnly: this.iconOnly(),
      block: this.block(),
    })
  })

  constructor() {
    // A capture listener on the element runs before the app's own (click)
    // handlers and `routerLink`, so a disabled or loading button does nothing,
    // like a native disabled button.
    const block = (event: Event) => {
      if (!isButtonInert({ disabled: this.state().disabled, loading: this.loading() })) return
      event.preventDefault()
      event.stopImmediatePropagation()
    }
    afterNextRender(() => this.host.addEventListener('click', block, { capture: true }))
    inject(DestroyRef).onDestroy(() =>
      this.host.removeEventListener('click', block, { capture: true }),
    )
  }
}
