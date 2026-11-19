import { forwardRef, type SVGProps } from 'react'
import { iconAttrs, type IconData, type IconOptions } from '@dexa-ui/icons'

export interface DxIconProps
  extends IconOptions, Omit<SVGProps<SVGSVGElement>, 'ref' | 'color' | 'children'> {
  /** An icon from `@dexa-ui/icons`, or any `{ path, viewBox }` icon. */
  icon: IconData
}

/**
 * An icon, sized and colored like the surrounding text unless `size` /
 * `color` say otherwise. Decorative unless it has a `label`.
 */
export const DxIcon = forwardRef<SVGSVGElement, DxIconProps>(function DxIcon(
  { icon, size, color, spin, label, className, style, ...rest },
  ref,
) {
  const { class: cls, style: own, ...attrs } = iconAttrs(icon, { size, color, spin, label })
  return (
    <svg
      ref={ref}
      {...attrs}
      {...rest}
      className={className ? `${cls} ${className}` : cls}
      style={own || style ? { ...own, ...style } : undefined}
    >
      <path d={icon.path} />
    </svg>
  )
})
