import {
  computed,
  inject,
  Injectable,
  InjectionToken,
  makeEnvironmentProviders,
  signal,
  type EnvironmentProviders,
  type Signal,
} from '@angular/core'
import {
  createTranslator,
  createZIndexManager,
  DEFAULT_SIZE,
  DEFAULT_Z_INDEX,
  mergeConfig,
  resolveSize,
  type DexaConfig,
  type DexaConfigInput,
  type Size,
  type TranslateParams,
  type ZIndexManager,
} from '@dexa-ui/core'
import { en } from '@dexa-ui/locales'

export const defaultConfig: DexaConfig = {
  locale: en,
  size: DEFAULT_SIZE,
  zIndex: DEFAULT_Z_INDEX,
}

/** App-level configuration, set with `provideDexa()`. */
export const DEXA_CONFIG = new InjectionToken<DexaConfigInput>('DEXA_CONFIG')

/**
 * `bootstrapApplication(App, { providers: [provideDexa({ locale: tr })] })`.
 * Optional: components work without it using English and size `md`.
 */
export function provideDexa(config: DexaConfigInput = {}): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: DEXA_CONFIG, useValue: config }])
}

/**
 * Configuration seen by a component: the nearest `<dx-config-provider>`,
 * then `provideDexa()`, then the defaults.
 */
@Injectable({ providedIn: 'root' })
export class DxConfigService {
  private readonly parent = inject(DxConfigService, { skipSelf: true, optional: true })
  private readonly root = inject(DEXA_CONFIG, { optional: true })
  private readonly overrides = signal<Signal<DexaConfigInput> | null>(null)
  private ownZIndex?: ZIndexManager

  readonly config: Signal<DexaConfig> = computed(() => {
    const inherited = this.parent?.config() ?? mergeConfig(defaultConfig, this.root ?? undefined)
    return mergeConfig(inherited, this.overrides()?.())
  })

  readonly locale = computed(() => this.config().locale)
  readonly dir = computed(() => this.locale().dir)
  private readonly translate = computed(() => createTranslator(this.locale(), en))

  /** Used by `<dx-config-provider>` to feed its inputs in. */
  setOverrides(source: Signal<DexaConfigInput>): void {
    this.overrides.set(source)
  }

  /** Translate a message, falling back to English. Reactive inside templates. */
  t(path: string, params?: TranslateParams): string {
    return this.translate()(path, params)
  }

  /** Component `size` input, falling back to the provider's size. */
  size(prop?: Size): Size {
    return resolveSize(prop, this.config())
  }

  /**
   * Shared overlay stack; a provider with its own `zIndex` starts a new one.
   * Call `next()` when an overlay opens (not in a constructor: provider inputs
   * are bound after child constructors run).
   */
  get zIndex(): ZIndexManager {
    const base = this.overrides()?.().zIndex
    if (base !== undefined) return (this.ownZIndex ??= createZIndexManager(base))
    if (this.parent) return this.parent.zIndex
    return (this.ownZIndex ??= createZIndexManager(this.config().zIndex))
  }
}
