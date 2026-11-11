import { describe, expect, it } from 'vitest'
import { contrastRatio, hexToRgb, luminance, mix, rgbToHex } from '../src/color'

describe('color', () => {
  it('parses short and long hex', () => {
    expect(hexToRgb('#fff')).toEqual({ r: 255, g: 255, b: 255 })
    expect(hexToRgb('2563eb')).toEqual({ r: 37, g: 99, b: 235 })
    expect(() => hexToRgb('#12')).toThrow()
  })

  it('round-trips hex', () => {
    expect(rgbToHex(hexToRgb('#2563eb'))).toBe('#2563eb')
  })

  it('computes WCAG luminance and contrast', () => {
    expect(luminance('#ffffff')).toBeCloseTo(1)
    expect(luminance('#000000')).toBeCloseTo(0)
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21)
    expect(contrastRatio('#ffffff', '#2563eb')).toBeCloseTo(5.17, 1)
  })

  it('mixes in OKLab like CSS color-mix', () => {
    expect(mix('#2563eb', '#ffffff', 1)).toBe('#2563eb')
    expect(mix('#2563eb', '#ffffff', 0)).toBe('#ffffff')
    // OKLab midpoint of black and white is L=0.5 → sRGB 99
    expect(mix('#000000', '#ffffff', 0.5)).toBe('#636363')
  })
})
