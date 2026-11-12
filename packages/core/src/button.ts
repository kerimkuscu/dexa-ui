import type { Intent, Size } from '@dexa-ui/tokens'
import { createNamespace, cx } from './bem'
import { DEFAULT_SIZE, type DexaConfig } from './config'

export const buttonVariants = ['solid', 'soft', 'outline', 'ghost'] as const

/**
 * - `solid`: filled with the intent color (main actions)
 * - `soft`: tinted background (secondary actions)
 * - `outline`: border only (the neutral "default" button with `intent="secondary"`)
 * - `ghost`: no background until hovered (toolbars, tertiary actions)
 */
export type ButtonVariant = (typeof buttonVariants)[number]

export type ButtonType = 'button' | 'submit' | 'reset'

export const DEFAULT_BUTTON_INTENT: Intent = 'primary'
export const DEFAULT_BUTTON_VARIANT: ButtonVariant = 'solid'

/** What a button group passes down to its buttons. */
export interface ButtonGroupOptions {
  intent?: Intent
  variant?: ButtonVariant
  size?: Size
  disabled?: boolean
}

export interface ResolvedButton {
  intent: Intent
  variant: ButtonVariant
  size: Size
  disabled: boolean
}

/**
 * Button prop wins, then the enclosing button group, then the provider size,
 * then the defaults. `disabled` on the group disables every button in it.
 */
export function resolveButton(
  own: ButtonGroupOptions,
  group: ButtonGroupOptions | null | undefined,
  config: Pick<DexaConfig, 'size'>,
): ResolvedButton {
  return {
    intent: own.intent ?? group?.intent ?? DEFAULT_BUTTON_INTENT,
    variant: own.variant ?? group?.variant ?? DEFAULT_BUTTON_VARIANT,
    size: own.size ?? group?.size ?? config.size ?? DEFAULT_SIZE,
    disabled: Boolean(own.disabled || group?.disabled),
  }
}

export interface ButtonClassOptions {
  intent?: Intent
  variant?: ButtonVariant
  size?: Size
  /** Fully rounded ends. */
  pill?: boolean
  /** Square button for a single icon (give it an `aria-label`). */
  iconOnly?: boolean
  /** Full width of its container. */
  block?: boolean
  loading?: boolean
  disabled?: boolean
}

const ns = createNamespace('button')

/**
 * Classes for a button. Use it to style any element as a button, e.g. a
 * router link: `<Link className={buttonClass({ variant: 'outline' })}>`.
 */
export function buttonClass(options: ButtonClassOptions = {}): string {
  return cx(
    ns.b(),
    ns.m(options.intent ?? DEFAULT_BUTTON_INTENT),
    ns.m(options.variant ?? DEFAULT_BUTTON_VARIANT),
    ns.m(options.size ?? DEFAULT_SIZE),
    options.pill && ns.m('pill'),
    options.iconOnly && ns.m('icon-only'),
    options.block && ns.m('block'),
    ns.is('loading', Boolean(options.loading)),
    ns.is('disabled', Boolean(options.disabled)),
  )
}

export interface ButtonGroupClassOptions {
  vertical?: boolean
}

export function buttonGroupClass(options: ButtonGroupClassOptions = {}): string {
  return cx(ns.b('group'), options.vertical && `${ns.b('group')}--vertical`)
}

export interface ButtonState {
  disabled: boolean
  loading: boolean
}

/** Accessibility attributes, framework-neutral (map `tabindex` to `tabIndex` in React). */
export interface ButtonA11yAttrs {
  disabled?: true
  'aria-disabled'?: 'true'
  'aria-busy'?: 'true'
  tabindex?: -1
}

/**
 * - `<button>`: native `disabled`. While loading it stays focusable (so focus
 *   is not lost mid-action) and is marked `aria-disabled` + `aria-busy`.
 * - Links and other elements cannot be disabled natively: `aria-disabled`,
 *   removed from the tab order, and clicks are blocked by the component.
 */
export function buttonA11y(
  nativeButton: boolean,
  { disabled, loading }: ButtonState,
): ButtonA11yAttrs {
  const attrs: ButtonA11yAttrs = {}
  if (nativeButton) {
    if (disabled) attrs.disabled = true
    else if (loading) attrs['aria-disabled'] = 'true'
  } else {
    if (disabled || loading) attrs['aria-disabled'] = 'true'
    if (disabled) attrs.tabindex = -1
  }
  if (loading) attrs['aria-busy'] = 'true'
  return attrs
}

/** A disabled or loading button ignores clicks, like a native disabled button. */
export function isButtonInert({ disabled, loading }: ButtonState): boolean {
  return disabled || loading
}
