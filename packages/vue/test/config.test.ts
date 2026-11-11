import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { tr } from '@dexa-ui/locales'
import { createDexa, DxConfigProvider, useLocale, useSize, useZIndex } from '../src'

/** Renders what a component would see from the config. */
const Probe = defineComponent({
  props: { size: { type: String as () => 'sm' | 'md' | 'lg', default: undefined } },
  setup(props) {
    const { t, locale } = useLocale()
    const size = useSize(() => props.size)
    return () => h('span', `${locale.value.name}|${size.value}|${t('common.close')}`)
  },
})

describe('config', () => {
  it('defaults to English and md without any provider', () => {
    expect(mount(Probe).text()).toBe('en|md|Close')
  })

  it('reads the app-level plugin config', () => {
    const wrapper = mount(Probe, { global: { plugins: [createDexa({ locale: tr, size: 'sm' })] } })
    expect(wrapper.text()).toBe('tr|sm|Kapat')
  })

  it('lets nested providers override and inherit', () => {
    const wrapper = mount(() =>
      h(DxConfigProvider, { locale: tr }, () =>
        h(DxConfigProvider, { size: 'lg' }, () => h(Probe)),
      ),
    )
    expect(wrapper.text()).toBe('tr|lg|Kapat')
  })

  it('prefers the component prop over the provider', () => {
    const wrapper = mount(() => h(DxConfigProvider, { size: 'lg' }, () => h(Probe, { size: 'sm' })))
    expect(wrapper.text()).toBe('en|sm|Close')
  })

  it('reacts to provider prop changes', async () => {
    const size = ref<'sm' | 'lg'>('sm')
    const wrapper = mount(() => h(DxConfigProvider, { size: size.value }, () => h(Probe)))
    expect(wrapper.text()).toBe('en|sm|Close')
    size.value = 'lg'
    await nextTick()
    expect(wrapper.text()).toBe('en|lg|Close')
  })

  it('shares a z-index stack, and starts a new one when zIndex is set', () => {
    const seen: number[] = []
    const Overlay = defineComponent(() => {
      seen.push(useZIndex().next())
      return () => null
    })
    mount(() => [
      h(DxConfigProvider, null, () => [h(Overlay), h(Overlay)]),
      h(DxConfigProvider, { zIndex: 5000 }, () => h(Overlay)),
    ], { global: { plugins: [createDexa({ zIndex: 100 })] } })
    expect(seen).toEqual([101, 102, 5001])
  })
})
