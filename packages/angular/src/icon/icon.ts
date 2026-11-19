import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core'
import { iconAttrs, type IconData } from '@dexa-ui/icons'

/**
 * `<svg dx-icon [icon]="iconCheck">`: an icon from `@dexa-ui/icons`, or any
 * `{ path, viewBox }` icon. Sized and colored like the surrounding text unless
 * `size` / `color` say otherwise. Decorative unless it has a `label`.
 */
@Component({
  selector: 'svg[dx-icon]',
  template: `<svg:path [attr.d]="icon().path" />`,
  host: {
    '[class]': 'attrs().class',
    '[attr.viewBox]': 'attrs().viewBox',
    fill: 'currentColor',
    focusable: 'false',
    '[attr.role]': 'attrs().role ?? null',
    '[attr.aria-label]': 'attrs()["aria-label"] ?? null',
    '[attr.aria-hidden]': 'attrs()["aria-hidden"] ?? null',
    '[style.font-size]': 'attrs().style?.fontSize ?? null',
    '[style.color]': 'attrs().style?.color ?? null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxIcon {
  readonly icon = input.required<IconData>()
  /** A number (px) or any CSS length. Defaults to `1em`. */
  readonly size = input<number | string>()
  /** Any CSS color. Defaults to the text color. */
  readonly color = input<string>()
  readonly spin = input(false, { transform: booleanAttribute })
  /** Accessible name, for an icon that means something on its own. */
  readonly label = input<string>()

  protected readonly attrs = computed(() =>
    iconAttrs(this.icon(), {
      size: this.size(),
      color: this.color(),
      spin: this.spin(),
      label: this.label(),
    }),
  )
}
