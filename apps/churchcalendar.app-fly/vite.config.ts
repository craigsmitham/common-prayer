import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { reactRouterHonoServer } from 'react-router-hono-server/dev';

export default defineConfig(({ isSsrBuild, command }) => {
  console.log('SSR BUILD', isSsrBuild);
  return {
    build: {
      rollupOptions: isSsrBuild ? { input: './app/server.ts' } : undefined,
    },
    ssr: {
      noExternal: command === 'build' ? true : undefined,
    },
    plugins: [
      reactRouterHonoServer(),
      reactRouter(),
      tsconfigPaths(),
      tailwindcss(),
    ],
  };
});
