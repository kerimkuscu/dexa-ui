import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'
import { tr } from '@dexa-ui/locales'
import { DxButton, DxButtonGroup, DxConfigProvider } from '../src'

describe('DxButton', () => {
  it('renders a primary solid md button of type "button"', () => {
    const { getByRole } = render(<DxButton>Save</DxButton>)
    const button = getByRole('button', { name: 'Save' })
    expect(button.className).toBe('dx-button dx-button--primary dx-button--solid dx-button--md')
    expect(button.getAttribute('type')).toBe('button')
  })

  it('applies intent, variant, size, shape and extra classes', () => {
    const { getByRole } = render(
      <DxButton intent="danger" variant="outline" size="lg" pill block className="mine">
        Delete
      </DxButton>,
    )
    expect(getByRole('button').className).toBe(
      'dx-button dx-button--danger dx-button--outline dx-button--lg dx-button--pill dx-button--block mine',
    )
  })

  it('calls onClick, but not when disabled or loading', () => {
    const onClick = vi.fn()
    const { getByRole, rerender } = render(<DxButton onClick={onClick}>Go</DxButton>)
    fireEvent.click(getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)

    rerender(
      <DxButton onClick={onClick} disabled>
        Go
      </DxButton>,
    )
    expect(getByRole('button').hasAttribute('disabled')).toBe(true)
    fireEvent.click(getByRole('button'))
    rerender(
      <DxButton onClick={onClick} loading>
        Go
      </DxButton>,
    )
    fireEvent.click(getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('does not let a loading click bubble or submit', () => {
    const onParent = vi.fn()
    const onSubmit = vi.fn((e: { preventDefault(): void }) => e.preventDefault())
    const { getByRole } = render(
      <form onSubmit={onSubmit} onClick={onParent}>
        <DxButton type="submit" loading>
          Send
        </DxButton>
      </form>,
    )
    fireEvent.click(getByRole('button'))
    expect(onParent).not.toHaveBeenCalled()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('stays focusable while loading and announces it', () => {
    const { getByRole } = render(<DxButton loading>Save</DxButton>)
    const button = getByRole('button')
    expect(button.hasAttribute('disabled')).toBe(false)
    expect(button.getAttribute('aria-disabled')).toBe('true')
    expect(button.getAttribute('aria-busy')).toBe('true')
    expect(button.querySelector('.dx-button__spinner')).not.toBeNull()
    expect(button.querySelector('.dx-button__sr')?.textContent).toBe('Loading')
  })

  it('translates the loading text', () => {
    const { container } = render(
      <DxConfigProvider locale={tr}>
        <DxButton loading />
      </DxConfigProvider>,
    )
    expect(container.querySelector('.dx-button__sr')?.textContent).toBe('Yükleniyor')
  })

  it('renders start and end around the label', () => {
    const { getByRole } = render(
      <DxButton start={<i>a</i>} end={<i>b</i>}>
        Label
      </DxButton>,
    )
    expect([...getByRole('button').children].map((c) => c.className)).toEqual([
      'dx-button__icon dx-button__icon--start',
      'dx-button__label',
      'dx-button__icon dx-button__icon--end',
    ])
  })

  it('renders a link with href, and disables it without a native attribute', () => {
    const onClick = vi.fn()
    const { container, rerender } = render(
      <DxButton href="/docs" onClick={onClick}>
        Docs
      </DxButton>,
    )
    const a = container.querySelector('a')!
    expect(a.getAttribute('href')).toBe('/docs')
    expect(a.hasAttribute('type')).toBe(false)

    rerender(
      <DxButton href="/docs" onClick={onClick} disabled>
        Docs
      </DxButton>,
    )
    expect(a.getAttribute('aria-disabled')).toBe('true')
    expect(a.getAttribute('tabindex')).toBe('-1')
    expect(a.classList.contains('is-disabled')).toBe(true)
    fireEvent.click(a)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('forwards the ref to the element', () => {
    const ref = createRef<HTMLElement>()
    render(<DxButton ref={ref}>Go</DxButton>)
    expect(ref.current?.tagName).toBe('BUTTON')
  })

  it('takes its size from the provider', () => {
    const { getByRole } = render(
      <DxConfigProvider size="sm">
        <DxButton>Go</DxButton>
      </DxConfigProvider>,
    )
    expect(getByRole('button').classList.contains('dx-button--sm')).toBe(true)
  })
})

describe('DxButtonGroup', () => {
  it('passes intent, variant, size and disabled to its buttons', () => {
    const { getByRole, getAllByRole } = render(
      <DxButtonGroup intent="secondary" variant="outline" size="sm" disabled aria-label="Align">
        <DxButton>Left</DxButton>
        <DxButton variant="solid">Right</DxButton>
      </DxButtonGroup>,
    )
    const group = getByRole('group', { name: 'Align' })
    expect(group.className).toBe('dx-button-group')
    const [first, second] = getAllByRole('button')
    expect(first!.className).toContain('dx-button--secondary dx-button--outline dx-button--sm')
    expect(second!.className).toContain('dx-button--solid')
    expect(first!.hasAttribute('disabled')).toBe(true)
  })

  it('can be vertical', () => {
    const { getByRole } = render(<DxButtonGroup vertical />)
    expect(getByRole('group').className).toBe('dx-button-group dx-button-group--vertical')
  })
})
