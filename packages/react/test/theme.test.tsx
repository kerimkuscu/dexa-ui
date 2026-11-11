import { afterEach, describe, expect, it } from 'vitest'
import { act, render } from '@testing-library/react'
import { useTheme } from '../src'

afterEach(() => document.documentElement.removeAttribute('data-theme'))

describe('useTheme', () => {
  it('sets data-theme and follows outside changes', async () => {
    let api!: ReturnType<typeof useTheme>
    function Probe() {
      api = useTheme()
      return <span>{api.theme}</span>
    }
    const { container } = render(<Probe />)
    expect(container.textContent).toBe('light')

    await act(async () => {
      api.setTheme('nord')
      await new Promise((r) => setTimeout(r))
    })
    expect(document.documentElement.dataset.theme).toBe('nord')
    expect(container.textContent).toBe('nord')

    await act(async () => {
      document.documentElement.setAttribute('data-theme', 'dracula')
      await new Promise((r) => setTimeout(r))
    })
    expect(container.textContent).toBe('dracula')
  })
})
