import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/chiang-mai-2026/', // 這裡填入你 GitHub 的專案名稱，前後都要有斜線
})