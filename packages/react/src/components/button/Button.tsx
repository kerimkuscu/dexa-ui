import {
  forwardRef,
  useContext,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from 'react'
import {
  buttonA11y,
  buttonClass,
  cx,
  isButtonInert,
  resolveButton,
  type ButtonType,
  type ButtonVariant,
  type Intent,
  type Size,
} from '@dexa-ui/core'
import { useConfig } from '../../config/context'
import { useLocale } from '../../hooks/useLocale'
import { ButtonGroupContext } from './context'

interface ButtonOwnProps {
  intent?: Intent
  variant?: ButtonVariant
  size?: Size
  disabled?: boolean
  /** Shows a spinner and ignores clicks; the button stays focusable. */
  loading?: boolean
  pill?: boolean
  /** Square, for a single icon. Give it an `aria-label`. */
  iconOnly?: boolean
  block?: boolean
  /** Before the label (an icon). Replaced by the spinner while loading. */
  start?: ReactNode
  /** After the label (an icon). */
  end?: ReactNode
  children?: ReactNode
}

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ButtonOwnProps | 'type'
> & {
  href?: undefined
  /** Defaults to `button`, so it never submits a form by accident. */
  type?: ButtonType
}

type AnchorProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & {
  /** Renders an `<a>`. */
  href: string
}

export type DxButtonProps = ButtonOwnProps & (NativeButtonProps | AnchorProps)

/**
 * A button, or a link styled as one when `href` is set. For a router link use
 * `buttonClass()` on the router's own link component. Inside a `DxButtonGroup`
 * it inherits the group's intent, variant, size and disabled state.
 */
export const DxButton = forwardRef<HTMLElement, DxButtonProps>(function DxButton(props, ref) {
  const {
    intent: ownIntent,
    variant: ownVariant,
    size: ownSize,
    disabled: ownDisabled,
    loading = false,
    pill,
    iconOnly,
    block,
    start,
    end,
    children,
    className,
    onClick,
    ...rest
  } = props
  const group = useContext(ButtonGroupContext)
  const config = useConfig()
  const { t } = useLocale()
  const { intent, variant, size, disabled } = resolveButton(
    { intent: ownIntent, variant: ownVariant, size: ownSize, disabled: ownDisabled },
    group,
    config,
  )

  const nativeButton = rest.href === undefined
  const { tabindex, ...a11y } = buttonA11y(nativeButton, { disabled, loading })

  const handleClick = (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
    if (isButtonInert({ disabled, loading })) {
      // Behave like a native disabled button: no action, no bubbling.
      event.preventDefault()
      event.stopPropagation()
      return
    }
    onClick?.(event)
  }

  const content = (
    <>
      {loading && <span className="dx-button__spinner" aria-hidden="true" />}
      {loading && <span className="dx-button__sr">{t('common.loading')}</span>}
      {start != null && <span className="dx-button__icon dx-button__icon--start">{start}</span>}
      <span className="dx-button__label">{children}</span>
      {end != null && <span className="dx-button__icon dx-button__icon--end">{end}</span>}
    </>
  )
  const classes = cx(
    buttonClass({ intent, variant, size, disabled, loading, pill, iconOnly, block }),
    className,
  )

  if (nativeButton) {
    const { type = 'button', ...buttonRest } = rest as NativeButtonProps
    return (
      <button
        {...buttonRest}
        {...a11y}
        ref={ref as Ref<HTMLButtonElement>}
        type={type}
        className={classes}
        onClick={handleClick}
      >
        {content}
      </button>
    )
  }
  return (
    <a
      {...(rest as AnchorProps)}
      {...a11y}
      ref={ref as Ref<HTMLAnchorElement>}
      tabIndex={tabindex ?? (rest as AnchorProps).tabIndex}
      className={classes}
      onClick={handleClick}
    >
      {content}
    </a>
  )
})
