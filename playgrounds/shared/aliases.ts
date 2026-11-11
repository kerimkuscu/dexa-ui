import { fileURLToPath } from 'node:url'

const pkg = (path: string) => fileURLToPath(new URL(`../../packages/${path}`, import.meta.url))

/**
 * Point the playgrounds at package sources so edits show up instantly (HMR)
 * without rebuilding. Exact matches only: `@dexa-ui/tokens/tokens.css` still
 * resolves through the package's exports (run `pnpm build` once).
 */
export function sourceAliases(framework: 'vue' | 'react') {
  return [
    { find: new RegExp(`^@dexa-ui/${framework}$`), replacement: pkg(`${framework}/src/index.ts`) },
    { find: /^@dexa-ui\/core$/, replacement: pkg('core/src/index.ts') },
    { find: /^@dexa-ui\/locales$/, replacement: pkg('locales/src/index.ts') },
    { find: /^@dexa-ui\/tokens$/, replacement: pkg('tokens/src/index.ts') },
    { find: /^@dexa-ui\/css$/, replacement: pkg('css/src/index.css') },
  ]
}
