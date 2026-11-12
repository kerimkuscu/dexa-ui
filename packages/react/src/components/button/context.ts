import { createContext } from 'react'
import type { ButtonGroupOptions } from '@dexa-ui/core'

/** Provided by `DxButtonGroup` to the buttons inside it. */
export const ButtonGroupContext = createContext<ButtonGroupOptions | null>(null)
