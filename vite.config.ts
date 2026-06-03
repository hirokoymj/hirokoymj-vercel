/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [react()],
    base: '/',
    build: {
      manifest: true,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('@mui') || id.includes('@emotion') || id.includes('tss-react')) {
              return 'vendor-mui';
            }
            if (id.includes('@apollo') || id.includes('graphql')) {
              return 'vendor-apollo';
            }
            if (id.includes('@auth0')) {
              return 'vendor-auth';
            }
            if (id.includes('@reduxjs') || id.includes('react-redux') || id.includes('/redux/')) {
              return 'vendor-redux';
            }
            if (id.includes('@google/genai')) {
              return 'vendor-ai';
            }
            if (
              id.includes('/react/') ||
              id.includes('/react-dom/') ||
              id.includes('react-router') ||
              id.includes('/scheduler/')
            ) {
              return 'vendor-react';
            }
            return 'vendor';
          },
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      css: false,
    },
  };
});
