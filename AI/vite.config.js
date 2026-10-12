import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    // duas páginas: a landing e os créditos
    rollupOptions: { input: { main: 'index.html', creditos: 'creditos.html' } },
  },
  test: {
    include: ['src/**/*.test.js'],
    passWithNoTests: true,
  },
});
