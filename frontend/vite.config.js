import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5000,
    proxy: {
      '/api': {
        target: 'https://movieenthusiast-backend.onrender.com/', 
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
