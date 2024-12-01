import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_default/test')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /_default/test!';
}
