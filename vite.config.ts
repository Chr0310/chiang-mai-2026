import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/chiang-mai-2026/', // 這裡是我們等等要在 GitHub 取的名字
})
