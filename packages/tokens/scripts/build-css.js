// Generates the token stylesheets from the compiled package.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildCss, dark, light, themeCss, themes } from '../dist/index.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'dist', 'css')
mkdirSync(join(out, 'themes'), { recursive: true })

// Everything: scale + all built-in themes.
writeFileSync(
  join(out, 'tokens.css'),
  buildCss({ defaultTheme: light, autoDarkTheme: dark, themes }),
)

// Slim base: scale + light/dark/auto. Add more with themes/<name>.css.
writeFileSync(
  join(out, 'base.css'),
  buildCss({ defaultTheme: light, autoDarkTheme: dark, themes: [light, dark] }),
)

// One file per theme, for apps that want to ship only the themes they use.
for (const theme of themes) {
  writeFileSync(join(out, 'themes', `${theme.name}.css`), themeCss(theme))
}

console.log(`tokens: wrote tokens.css, base.css + ${themes.length} theme files`)
