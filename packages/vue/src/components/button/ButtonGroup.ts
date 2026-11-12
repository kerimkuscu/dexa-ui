import { computed, defineComponent, h, provide, type PropType } from 'vue'
import { buttonGroupClass, type ButtonVariant, type Intent, type Size } from '@dexa-ui/core'
import { BUTTON_GROUP } from './context'

/**
 * Joins buttons into one control. `intent`, `variant`, `size` and `disabled`
 * apply to every button inside unless a button sets its own.
 * Give it an `aria-label` describing the group.
 */
export const DxButtonGroup = defineComponent({
  name: 'DxButtonGroup',
  props: {
    intent: { type: String as PropType<Intent>, default: undefined },
    variant: { type: String as PropType<ButtonVariant>, default: undefined },
    size: { type: String as PropType<Size>, default: undefined },
    disabled: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
  },
  setup(props, { slots }) {
    provide(
      BUTTON_GROUP,
      computed(() => ({
        intent: props.intent,
        variant: props.variant,
        size: props.size,
        disabled: props.disabled,
      })),
    )
    return () =>
      h(
        'div',
        { class: buttonGroupClass({ vertical: props.vertical }), role: 'group' },
        slots.default?.(),
      )
  },
})
