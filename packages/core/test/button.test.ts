import { describe, expect, it } from 'vitest'
import { buttonA11y, buttonClass, buttonGroupClass, isButtonInert, resolveButton } from '../src'

describe('buttonClass', () => {
  it('applies the defaults: primary, solid, md', () => {
    expect(buttonClass()).toBe('dx-button dx-button--primary dx-button--solid dx-button--md')
  })

  it('adds modifiers and states', () => {
    expect(
      buttonClass({
        intent: 'danger',
        variant: 'outline',
        size: 'sm',
        pill: true,
        iconOnly: true,
        block: true,
        loading: true,
        disabled: true,
      }),
    ).toBe(
      'dx-button dx-button--danger dx-button--outline dx-button--sm dx-button--pill dx-button--icon-only dx-button--block is-loading is-disabled',
    )
  })

  it('builds group classes', () => {
    expect(buttonGroupClass()).toBe('dx-button-group')
    expect(buttonGroupClass({ vertical: true })).toBe('dx-button-group dx-button-group--vertical')
  })
})

describe('resolveButton', () => {
  const config = { size: 'lg' as const }

  it('falls back to the provider size and the defaults', () => {
    expect(resolveButton({}, null, config)).toEqual({
      intent: 'primary',
      variant: 'solid',
      size: 'lg',
      disabled: false,
    })
  })

  it('lets the group override the defaults and the button override the group', () => {
    const group = { intent: 'success', variant: 'soft', size: 'sm' } as const
    expect(resolveButton({}, group, config)).toEqual({
      intent: 'success',
      variant: 'soft',
      size: 'sm',
      disabled: false,
    })
    expect(resolveButton({ variant: 'ghost', size: 'md' }, group, config)).toMatchObject({
      intent: 'success',
      variant: 'ghost',
      size: 'md',
    })
  })

  it('disables every button when the group is disabled', () => {
    expect(resolveButton({ disabled: false }, { disabled: true }, config).disabled).toBe(true)
  })
})

describe('buttonA11y', () => {
  it('uses native disabled on buttons, aria-disabled while loading', () => {
    expect(buttonA11y(true, { disabled: false, loading: false })).toEqual({})
    expect(buttonA11y(true, { disabled: true, loading: false })).toEqual({ disabled: true })
    expect(buttonA11y(true, { disabled: false, loading: true })).toEqual({
      'aria-disabled': 'true',
      'aria-busy': 'true',
    })
  })

  it('takes disabled links out of the tab order', () => {
    expect(buttonA11y(false, { disabled: true, loading: false })).toEqual({
      'aria-disabled': 'true',
      tabindex: -1,
    })
    expect(buttonA11y(false, { disabled: false, loading: true })).toEqual({
      'aria-disabled': 'true',
      'aria-busy': 'true',
    })
  })

  it('reports when clicks must be ignored', () => {
    expect(isButtonInert({ disabled: false, loading: false })).toBe(false)
    expect(isButtonInert({ disabled: true, loading: false })).toBe(true)
    expect(isButtonInert({ disabled: false, loading: true })).toBe(true)
  })
})
