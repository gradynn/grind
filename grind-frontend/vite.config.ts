import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
})
