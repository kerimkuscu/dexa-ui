import { computed, type App, type Plugin } from 'vue'
import { createZIndexManager, mergeConfig, type DexaConfigInput } from '@dexa-ui/core'
import { DEXA_CONTEXT, defaultConfig } from './config/context'

/**
 * `app.use(createDexa({ locale: tr, size: 'sm' }))`. Optional: components
 * work without it using English and size `md`.
 */
export function createDexa(options: DexaConfigInput = {}): Plugin {
  return {
    install(app: App) {
      const config = mergeConfig(defaultConfig, options)
      app.provide(DEXA_CONTEXT, {
        config: computed(() => config),
        zIndex: createZIndexManager(config.zIndex),
      })
    },
  }
}
