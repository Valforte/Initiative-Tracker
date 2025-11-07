import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  base: '/Initiative-Tracker/',
  build: {
    cssMinify: 'esbuild', // Use esbuild instead of lightningcss to avoid @property warnings
  },
  test: {
    globals: true,
    environment: 'jsdom',
  }
})
