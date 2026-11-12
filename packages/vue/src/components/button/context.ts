import type { ComputedRef, InjectionKey } from 'vue'
import type { ButtonGroupOptions } from '@dexa-ui/core'

/** Provided by `DxButtonGroup` to the buttons inside it. */
export const BUTTON_GROUP: InjectionKey<ComputedRef<ButtonGroupOptions>> = Symbol('dx-button-group')
