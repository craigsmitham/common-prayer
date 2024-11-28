import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_default/connect')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /connect!';
}
