# dexa-ui

A component library for **Vue, React and Angular** — one design system, one
set of styles, native components in each framework.

> Status: early development. Packages are not published to npm yet.

## Packages

| Package            | What it is                                                |
| ------------------ | --------------------------------------------------------- |
| `@dexa-ui/vue`     | Vue 3 components (Vue 3.4+)                               |
| `@dexa-ui/react`   | React components (React 18+)                              |
| `@dexa-ui/angular` | Angular components (Angular 21+)                          |
| `@dexa-ui/css`     | All styles; also works in plain HTML                      |
| `@dexa-ui/tokens`  | Design tokens and themes as CSS custom properties         |
| `@dexa-ui/core`    | Framework-agnostic logic shared by the framework packages |
| `@dexa-ui/locales` | UI translations (English default, Turkish, more to come)  |

## Themes

Seven built-in themes, switched with a `data-theme` attribute on any element
(themes can be nested):

`light` (default) · `dark` · `nord` · `dracula` · `monokai` ·
`solarized-light` · `solarized-dark` · `auto` (follows the OS)

Every theme is tested against WCAG AA contrast. Validate your own theme with
`checkThemeContrast()` from `@dexa-ui/tokens`.

```html
<html data-theme="nord"></html>
```

## Usage (preview)

```ts
// Vue
import { createDexa } from '@dexa-ui/vue'
import '@dexa-ui/css'
app.use(createDexa({ locale: tr }))
```

```tsx
// React
import { DxConfigProvider } from '@dexa-ui/react'
import '@dexa-ui/css'
;<DxConfigProvider locale={tr}>{children}</DxConfigProvider>
```

```ts
// Angular
import { provideDexa } from '@dexa-ui/angular'
bootstrapApplication(App, { providers: [provideDexa({ locale: tr })] })
// angular.json → "styles": ["node_modules/@dexa-ui/css/dist/dexa-ui.css"]
```

## Development

Requires Node 24 and pnpm (`corepack enable`).

```bash
pnpm install
pnpm build          # all packages
pnpm test           # all tests
pnpm lint
pnpm dev:vue        # playground (also dev:react, dev:angular)
```

Run `pnpm build` once before starting a playground; after that the
playgrounds use the package sources directly, so edits show up instantly.

## License

MIT
