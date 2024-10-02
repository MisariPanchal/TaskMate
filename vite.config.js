import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base:"/TaskMate/",
  optimizeDeps: {
    include: ['redux-devtools-extension'],
    exclude: ['some-other-package-if-needed']
  }
})
