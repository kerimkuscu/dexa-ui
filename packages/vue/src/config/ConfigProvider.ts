import { computed, defineComponent, provide, type PropType } from 'vue'
import { createZIndexManager, mergeConfig, type Locale, type Size } from '@dexa-ui/core'
import { DEXA_CONTEXT, useDexaContext, type DexaContext } from './context'

/**
 * Overrides the configuration for everything inside it. Providers can be
 * nested; unset props inherit from the nearest outer provider.
 * Renders no element of its own.
 */
export const DxConfigProvider = defineComponent({
  name: 'DxConfigProvider',
  props: {
    locale: { type: Object as PropType<Locale>, default: undefined },
    size: { type: String as PropType<Size>, default: undefined },
    zIndex: { type: Number, default: undefined },
  },
  setup(props, { slots }) {
    const parent = useDexaContext()
    const config = computed(() =>
      mergeConfig(parent.config.value, {
        locale: props.locale,
        size: props.size,
        zIndex: props.zIndex,
      }),
    )
    const context: DexaContext = {
      config,
      // A new z-index base starts a separate stack; otherwise share the parent's.
      zIndex: props.zIndex === undefined ? parent.zIndex : createZIndexManager(props.zIndex),
    }
    provide(DEXA_CONTEXT, context)
    return () => slots.default?.()
  },
})
