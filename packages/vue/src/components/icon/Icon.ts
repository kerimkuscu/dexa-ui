import { defineComponent, h, type PropType } from 'vue'
import { iconAttrs, type IconData } from '@dexa-ui/icons'

/**
 * An icon from `@dexa-ui/icons`, or any `{ path, viewBox }` icon. Sized and
 * colored like the surrounding text unless `size` / `color` say otherwise.
 * Decorative unless it has a `label`.
 */
export const DxIcon = defineComponent({
  name: 'DxIcon',
  props: {
    icon: { type: Object as PropType<IconData>, required: true },
    /** A number (px) or any CSS length. Defaults to `1em`. */
    size: { type: [Number, String], default: undefined },
    /** Any CSS color. Defaults to the text color. */
    color: { type: String, default: undefined },
    spin: { type: Boolean, default: false },
    /** Accessible name, for an icon that means something on its own. */
    label: { type: String, default: undefined },
  },
  setup(props) {
    return () => h('svg', iconAttrs(props.icon, props), [h('path', { d: props.icon.path })])
  },
})
