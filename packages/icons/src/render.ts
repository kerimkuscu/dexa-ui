import type { IconData } from './types'

/** The grid of this package's icons. */
export const ICON_VIEWBOX = '0 0 24 24'

export interface IconOptions {
  /** Icon size: a number (px) or any CSS length. Defaults to `1em`, the size of the text around it. */
  size?: number | string
  /** Any CSS color. Defaults to `currentColor`, the color of the text around it. */
  color?: string
  /** Rotates continuously, e.g. a loading indicator. */
  spin?: boolean
  /**
   * Accessible name. Give one when the icon means something on its own; without
   * one it is decorative and hidden from assistive technology.
   */
  label?: string
}

export interface IconAttrs {
  viewBox: string
  class: string
  fill: 'currentColor'
  focusable: 'false'
  role?: 'img'
  'aria-label'?: string
  'aria-hidden'?: 'true'
  style?: { fontSize?: string; color?: string }
}

/** CSS length for the `size` option. */
export const iconSize = (size: number | string | undefined) =>
  typeof size === 'number' ? `${size}px` : size

/** `dx-icon` plus modifier classes. */
export function iconClass(icon: IconData, { spin = false }: Pick<IconOptions, 'spin'> = {}) {
  return ['dx-icon', icon.rtl && 'dx-icon--rtl', spin && 'dx-icon--spin'].filter(Boolean).join(' ')
}

/** The attributes of the `<svg>` element for an icon. */
export function iconAttrs(icon: IconData, options: IconOptions = {}): IconAttrs {
  const fontSize = iconSize(options.size)
  const style = {
    ...(fontSize && { fontSize }),
    ...(options.color && { color: options.color }),
  }
  return {
    viewBox: icon.viewBox ?? ICON_VIEWBOX,
    class: iconClass(icon, options),
    fill: 'currentColor',
    focusable: 'false',
    ...(options.label ? { role: 'img', 'aria-label': options.label } : { 'aria-hidden': 'true' }),
    ...(Object.keys(style).length > 0 && { style }),
  }
}

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * The icon as an SVG string, for plain HTML, server rendering or anywhere
 * without a framework component. Style it with `@dexa-ui/css`.
 */
export function iconSvg(icon: IconData, options: IconOptions = {}): string {
  const { style, ...attrs } = iconAttrs(icon, options)
  const css = style && [
    style.fontSize && `font-size:${style.fontSize}`,
    style.color && `color:${style.color}`,
  ]
  const list: [string, string | undefined][] = [
    ['xmlns', 'http://www.w3.org/2000/svg'],
    ...Object.entries(attrs),
    ['style', css?.filter(Boolean).join(';')],
  ]
  const html = list
    .filter((entry): entry is [string, string] => Boolean(entry[1]))
    .map(([name, value]) => ` ${name}="${escape(value)}"`)
    .join('')
  return `<svg${html}><path d="${escape(icon.path)}"/></svg>`
}
