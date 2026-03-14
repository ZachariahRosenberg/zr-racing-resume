import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/zr-racing-resume/',
  plugins: [react(), tailwindcss()],
})
