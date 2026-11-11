import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { tr } from '@dexa-ui/locales'
import type { Size } from '@dexa-ui/core'
import { DxConfigProvider, useLocale, useSize, useZIndex } from '../src'

function Probe({ size }: { size?: Size }) {
  const { t, locale } = useLocale()
  const resolved = useSize(size)
  return <span>{`${locale.name}|${resolved}|${t('common.close')}`}</span>
}

describe('config', () => {
  it('defaults to English and md without any provider', () => {
    expect(render(<Probe />).container.textContent).toBe('en|md|Close')
  })

  it('lets nested providers override and inherit', () => {
    const { container } = render(
      <DxConfigProvider locale={tr}>
        <DxConfigProvider size="lg">
          <Probe />
        </DxConfigProvider>
      </DxConfigProvider>,
    )
    expect(container.textContent).toBe('tr|lg|Kapat')
  })

  it('prefers the component prop over the provider', () => {
    const { container } = render(
      <DxConfigProvider size="lg">
        <Probe size="sm" />
      </DxConfigProvider>,
    )
    expect(container.textContent).toBe('en|sm|Close')
  })

  it('reacts to provider prop changes', () => {
    const { container, rerender } = render(
      <DxConfigProvider size="sm">
        <Probe />
      </DxConfigProvider>,
    )
    expect(container.textContent).toBe('en|sm|Close')
    rerender(
      <DxConfigProvider size="lg">
        <Probe />
      </DxConfigProvider>,
    )
    expect(container.textContent).toBe('en|lg|Close')
  })

  it('shares a z-index stack, and starts a new one when zIndex is set', () => {
    const seen: number[] = []
    function Overlay() {
      const z = useZIndex()
      // Taken once per mount, like an overlay opening.
      useState(() => seen.push(z.next()))
      return null
    }
    render(
      <DxConfigProvider zIndex={100}>
        <Overlay />
        <Overlay />
        <DxConfigProvider zIndex={5000}>
          <Overlay />
        </DxConfigProvider>
      </DxConfigProvider>,
    )
    expect(seen).toEqual([101, 102, 5001])
  })
})
