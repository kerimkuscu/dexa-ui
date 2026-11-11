import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { sourceAliases } from '../shared/aliases'

export default defineConfig({
  plugins: [vue()],
  resolve: { alias: sourceAliases('vue') },
})
