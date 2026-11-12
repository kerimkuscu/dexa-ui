import {
  computed,
  defineComponent,
  h,
  inject,
  type Component,
  type PropType,
  type SlotsType,
  type VNode,
} from 'vue'
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
import { useConfig } from '../../config/context'
import { useLocale } from '../../composables/useLocale'
import { BUTTON_GROUP } from './context'

/**
 * A button, or a link styled as one (`href`), or any element / component
 * (`tag`, e.g. `RouterLink`). Inside a `DxButtonGroup` it inherits the group's
 * intent, variant, size and disabled state unless it sets its own.
 */
export const DxButton = defineComponent({
  name: 'DxButton',
  props: {
    intent: { type: String as PropType<Intent>, default: undefined },
    variant: { type: String as PropType<ButtonVariant>, default: undefined },
    size: { type: String as PropType<Size>, default: undefined },
    /** Native button type. Defaults to `button`, so it never submits a form by accident. */
    type: { type: String as PropType<ButtonType>, default: 'button' },
    /** Renders an `<a>`. */
    href: { type: String, default: undefined },
    /** Element or component to render instead, e.g. `RouterLink` (pass `to` as usual). */
    tag: { type: [String, Object, Function] as PropType<string | Component>, default: undefined },
    disabled: { type: Boolean, default: false },
    /** Shows a spinner and ignores clicks; the button stays focusable. */
    loading: { type: Boolean, default: false },
    pill: { type: Boolean, default: false },
    /** Square, for a single icon. Give it an `aria-label`. */
    iconOnly: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
  },
  emits: {
    click: (_event: MouseEvent) => true,
  },
  slots: Object as SlotsType<{
    default?: () => VNode[]
    /** Before the label (an icon). Replaced by the spinner while loading. */
    start?: () => VNode[]
    /** After the label (an icon). */
    end?: () => VNode[]
  }>,
  setup(props, { slots, emit }) {
    const group = inject(BUTTON_GROUP, null)
    const config = useConfig()
    const { t } = useLocale()

    const state = computed(() => resolveButton(props, group?.value, config.value))
    const element = computed(() => props.tag ?? (props.href === undefined ? 'button' : 'a'))

    function onClick(event: MouseEvent) {
      if (isButtonInert({ disabled: state.value.disabled, loading: props.loading })) {
        // Behave like a native disabled button: no action, no bubbling.
        event.preventDefault()
        event.stopPropagation()
        return
      }
      emit('click', event)
    }

    return () => {
      const { intent, variant, size, disabled } = state.value
      const el = element.value
      const nativeButton = el === 'button'
      const children = [
        props.loading && h('span', { class: 'dx-button__spinner', 'aria-hidden': 'true' }),
        props.loading && h('span', { class: 'dx-button__sr' }, t('common.loading')),
        slots.start &&
          h('span', { class: 'dx-button__icon dx-button__icon--start' }, slots.start()),
        h('span', { class: 'dx-button__label' }, slots.default?.()),
        slots.end && h('span', { class: 'dx-button__icon dx-button__icon--end' }, slots.end()),
      ]
      return h(
        el,
        {
          class: buttonClass({
            intent,
            variant,
            size,
            disabled,
            loading: props.loading,
            pill: props.pill,
            iconOnly: props.iconOnly,
            block: props.block,
          }),
          // Only set when used: a component (RouterLink) must not get `href: undefined`.
          ...(nativeButton && { type: props.type }),
          ...(props.href !== undefined && { href: props.href }),
          ...buttonA11y(nativeButton, { disabled, loading: props.loading }),
          onClick,
        },
        // Components (RouterLink…) take slots, elements take children.
        typeof el === 'string' ? children : { default: () => children },
      )
    }
  },
})
