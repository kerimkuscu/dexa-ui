import { describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { tr } from '@dexa-ui/locales'
import { DxButton, DxButtonGroup, DxConfigProvider } from '../src'

describe('DxButton', () => {
  it('renders a primary solid md button of type "button"', () => {
    const wrapper = mount(DxButton, { slots: { default: () => 'Save' } })
    const el = wrapper.get('button')
    expect(el.classes()).toEqual([
      'dx-button',
      'dx-button--primary',
      'dx-button--solid',
      'dx-button--md',
    ])
    expect(el.attributes('type')).toBe('button')
    expect(el.text()).toBe('Save')
  })

  it('applies intent, variant, size and shape', () => {
    const wrapper = mount(DxButton, {
      props: { intent: 'danger', variant: 'outline', size: 'lg', pill: true, block: true },
    })
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining([
        'dx-button--danger',
        'dx-button--outline',
        'dx-button--lg',
        'dx-button--pill',
        'dx-button--block',
      ]),
    )
  })

  it('emits click, but not when disabled or loading', async () => {
    const wrapper = mount(DxButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)

    await wrapper.setProps({ disabled: true })
    expect(wrapper.attributes('disabled')).toBeDefined()
    await wrapper.trigger('click')
    await wrapper.setProps({ disabled: false, loading: true })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('stays focusable while loading and announces it', () => {
    const wrapper = mount(DxButton, {
      props: { loading: true },
      slots: { start: () => h('svg'), default: () => 'Save' },
    })
    expect(wrapper.attributes('disabled')).toBeUndefined()
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.find('.dx-button__spinner').exists()).toBe(true)
    expect(wrapper.get('.dx-button__sr').text()).toBe('Loading')
  })

  it('translates the loading text', () => {
    const wrapper = mount(() =>
      h(DxConfigProvider, { locale: tr }, () => h(DxButton, { loading: true })),
    )
    expect(wrapper.get('.dx-button__sr').text()).toBe('Yükleniyor')
  })

  it('renders icon slots around the label', () => {
    const wrapper = mount(DxButton, {
      slots: { start: () => h('i', 'a'), default: () => 'Label', end: () => h('i', 'b') },
    })
    expect(wrapper.findAll('span').map((s) => s.classes().join(' '))).toEqual([
      'dx-button__icon dx-button__icon--start',
      'dx-button__label',
      'dx-button__icon dx-button__icon--end',
    ])
  })

  it('renders a link with href, and disables it without a native attribute', async () => {
    const wrapper = mount(DxButton, { props: { href: '/docs' } })
    const a = wrapper.get('a')
    expect(a.attributes('href')).toBe('/docs')
    expect(a.attributes('type')).toBeUndefined()

    await wrapper.setProps({ disabled: true })
    expect(a.attributes('aria-disabled')).toBe('true')
    expect(a.attributes('tabindex')).toBe('-1')
    expect(a.classes()).toContain('is-disabled')
    await a.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('renders a custom component with tag', () => {
    const FakeLink = defineComponent({
      props: { to: { type: String, required: true } },
      setup:
        (props, { slots }) =>
        () =>
          h('a', { href: props.to }, slots.default?.()),
    })
    const wrapper = mount(DxButton, {
      props: { tag: FakeLink },
      attrs: { to: '/home' },
      slots: { default: () => 'Home' },
    })
    expect(wrapper.get('a').attributes('href')).toBe('/home')
    expect(wrapper.get('a').classes()).toContain('dx-button')
    expect(wrapper.text()).toBe('Home')
  })

  it('takes its size from the provider', () => {
    const wrapper = mount(() => h(DxConfigProvider, { size: 'sm' }, () => h(DxButton)))
    expect(wrapper.get('button').classes()).toContain('dx-button--sm')
  })
})

describe('DxButtonGroup', () => {
  it('passes intent, variant, size and disabled to its buttons', () => {
    const wrapper = mount(() =>
      h(
        DxButtonGroup,
        {
          intent: 'secondary',
          variant: 'outline',
          size: 'sm',
          disabled: true,
          'aria-label': 'Align',
        },
        () => [h(DxButton), h(DxButton, { variant: 'solid' })],
      ),
    )
    const group = wrapper.get('div')
    expect(group.attributes('role')).toBe('group')
    expect(group.attributes('aria-label')).toBe('Align')
    expect(group.classes()).toEqual(['dx-button-group'])
    const [first, second] = wrapper.findAll('button')
    expect(first!.classes()).toEqual(
      expect.arrayContaining(['dx-button--secondary', 'dx-button--outline', 'dx-button--sm']),
    )
    expect(second!.classes()).toContain('dx-button--solid')
    expect(first!.attributes('disabled')).toBeDefined()
  })

  it('can be vertical', () => {
    const wrapper = mount(DxButtonGroup, { props: { vertical: true } })
    expect(wrapper.classes()).toContain('dx-button-group--vertical')
  })
})
