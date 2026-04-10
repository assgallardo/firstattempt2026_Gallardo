import { defineConfig } from 'vite'
import path from 'path'
import type { Plugin } from 'vite'

/**
 * Stub plugin for Figma Make's `figma:asset/*` virtual module scheme.
 * In Figma Make these resolve to embedded binary assets; locally we
 * return an empty-string default export so no import errors occur.
 */
function figmaAssetPlugin(): Plugin {
  const VIRTUAL_PREFIX = 'figma:asset/'
  return {
    name: 'figma-asset-stub',
    resolveId(id) {
      if (id.startsWith(VIRTUAL_PREFIX)) return '\0' + id
    },
    load(id) {
      if (id.startsWith('\0' + VIRTUAL_PREFIX)) {
        // Return an empty string — components using these images
        // will simply render a broken-image placeholder locally.
        return 'export default ""'
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv'],
  server: {
    port: 5173,
    open: true,
  },
})
