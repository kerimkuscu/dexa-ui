// Bundles and minifies the stylesheets with Lightning CSS.
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import browserslist from 'browserslist'
import { browserslistToTargets, bundleAsync } from 'lightningcss'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'src')
const dist = join(root, 'dist')
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
const targets = browserslistToTargets(browserslist(pkg.browserslist))

const resolver = {
  read: (file) => readFileSync(file, 'utf8'),
  // Bare specifiers (`@dexa-ui/tokens/tokens.css`) go through the package's exports map.
  resolve(specifier, from) {
    if (specifier.startsWith('.')) return resolve(dirname(from), specifier)
    return fileURLToPath(import.meta.resolve(specifier, `file://${from}`))
  },
}

async function build(entry, out, { minify = false } = {}) {
  const { code } = await bundleAsync({ filename: entry, resolver, targets, minify })
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, code)
  console.log(`css: ${relative(root, out)} (${(code.length / 1024).toFixed(1)} kB)`)
}

// Full bundle (tokens + reboot + components), readable and minified.
await build(join(src, 'index.css'), join(dist, 'dexa-ui.css'))
await build(join(src, 'index.css'), join(dist, 'dexa-ui.min.css'), { minify: true })

// Pieces for apps that compose their own bundle.
await build(join(src, 'reboot.css'), join(dist, 'reboot.css'))
await build(join(src, 'components.css'), join(dist, 'components.css'))
const componentsDir = join(src, 'components')
const componentFiles = existsSync(componentsDir)
  ? readdirSync(componentsDir).filter((f) => f.endsWith('.css'))
  : []
for (const file of componentFiles) {
  await build(join(componentsDir, file), join(dist, 'components', file))
}
