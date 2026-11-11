import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const dist = join(import.meta.dirname, '..', 'dist')

describe('css bundle', () => {
  it('builds the full and minified bundles', () => {
    expect(existsSync(join(dist, 'dexa-ui.css'))).toBe(true)
    expect(existsSync(join(dist, 'dexa-ui.min.css'))).toBe(true)
  })

  it('inlines the tokens and the reboot', () => {
    const css = readFileSync(join(dist, 'dexa-ui.css'), 'utf8')
    expect(css).toContain('--dx-color-primary')
    expect(css).toContain('[data-theme="nord"]')
    expect(css).toContain(':where(body)')
    expect(css).not.toContain('@import')
  })
})
