import { useMemo, type HTMLAttributes } from 'react'
import { buttonGroupClass, cx, type ButtonVariant, type Intent, type Size } from '@dexa-ui/core'
import { ButtonGroupContext } from './context'

export interface DxButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  intent?: Intent
  variant?: ButtonVariant
  size?: Size
  disabled?: boolean
  vertical?: boolean
}

/**
 * Joins buttons into one control. `intent`, `variant`, `size` and `disabled`
 * apply to every button inside unless a button sets its own.
 * Give it an `aria-label` describing the group.
 */
export function DxButtonGroup({
  intent,
  variant,
  size,
  disabled,
  vertical,
  className,
  children,
  ...rest
}: DxButtonGroupProps) {
  const value = useMemo(
    () => ({ intent, variant, size, disabled }),
    [intent, variant, size, disabled],
  )
  return (
    <div role="group" {...rest} className={cx(buttonGroupClass({ vertical }), className)}>
      <ButtonGroupContext.Provider value={value}>{children}</ButtonGroupContext.Provider>
    </div>
  )
}
