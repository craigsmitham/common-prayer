// app.config.ts
import { defineConfig } from '@tanstack/start/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  server: {
    preset: 'vercel',
  },
  tsr: {
    semicolons: true,
    quoteStyle: 'single',
    apiBase: '/a',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
