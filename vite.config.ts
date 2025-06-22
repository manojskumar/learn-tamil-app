import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/learn-tamil-app/', // IMPORTANT: Set this to your GitHub repository name
  build: {
    outDir: 'docs', // Output to 'docs' folder
  }
})