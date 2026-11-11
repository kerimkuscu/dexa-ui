import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { useTheme } from '../src'

afterEach(() => document.documentElement.removeAttribute('data-theme'))

describe('useTheme', () => {
  it('sets data-theme and follows outside changes', async () => {
    let api!: ReturnType<typeof useTheme>
    const wrapper = mount(
      defineComponent(() => {
        api = useTheme()
        return () => h('span', api.theme.value)
      }),
    )
    expect(wrapper.text()).toBe('light')
    api.setTheme('nord')
    expect(document.documentElement.dataset.theme).toBe('nord')
    await new Promise((r) => setTimeout(r))
    await nextTick()
    expect(wrapper.text()).toBe('nord')

    document.documentElement.setAttribute('data-theme', 'dracula')
    await new Promise((r) => setTimeout(r))
    await nextTick()
    expect(wrapper.text()).toBe('dracula')
  })
})
