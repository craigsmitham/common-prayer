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
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
