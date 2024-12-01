// app/router.tsx
import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import NotFoundComponent from './components/NotFoundComponent';

export function createRouter() {
  const router = createTanStackRouter({
    defaultNotFoundComponent: NotFoundComponent,
    routeTree,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
