import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    exclude: ['node_modules', 'dist', 'tests/**'],
  },

  server: {
    proxy: {
      '/ingest': {
        target: 'https://eu.i.posthog.com', // Переконайся, що тут саме EU, якщо ти на європейському сервері
        changeOrigin: true,
        // Ми прибираємо /ingest з початку, але залишаємо все інше
        rewrite: (path) => path.replace(/^\/ingest/, ''),
      },
    },
  },
});
