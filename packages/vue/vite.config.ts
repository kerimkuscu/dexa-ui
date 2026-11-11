import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
    sourcemap: true,
    rolldownOptions: {
      external: [/^vue/, /^@dexa-ui\//],
      output: {
        // One file per module so bundlers can drop unused components.
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
      },
    },
  },
  test: {
    environment: 'happy-dom',
  },
})
