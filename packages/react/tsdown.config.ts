import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['src/index.ts'],
  format: 'esm',
  dts: true,
  sourcemap: true,
  clean: true,
  // Components use hooks and context: mark the bundle as client code for React Server Components.
  outputOptions: { banner: "'use client';" },
})
