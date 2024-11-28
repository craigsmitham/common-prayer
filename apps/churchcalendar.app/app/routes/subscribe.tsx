import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/subscribe')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /subscribe!';
}
