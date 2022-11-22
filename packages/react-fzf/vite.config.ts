import path from 'node:path'

import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      fileName: 'react-fzf',
      name: 'react-fzf',
    },
    minify: false,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react/jsx-runtime': 'reactJsxRuntime',
        },
      },
    },
  },
  plugins: [dts(), react()],
  test: {
    css: false,
    environment: 'happy-dom',
  },
})
