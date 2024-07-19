import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5000,
    proxy: {
      "/api": {
        target: 'https://movieenthusiast-backend.onrender.com/', // Replace with your deployed backend URL
        changeOrigin: true,
        secure: true, }
    }
  }
})
