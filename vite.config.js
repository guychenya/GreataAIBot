import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
   build: {
    outDir: 'dist',
    sourcemap: true,
  },
  rollupOptions: {
    output: {
      manualChunks: {
        react: ['react', 'react-dom', 'react-router-dom'],
        ui: ['framer-motion', 'react-icons'],
        echarts: ['echarts', 'echarts-for-react'],
        supabase: ['@supabase/supabase-js']
      }
    }
  }
});