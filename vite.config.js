import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],   // This adds support for React
  base: '/Forex-Calculator/',  // This is essential for GitHub Pages deployment
})
