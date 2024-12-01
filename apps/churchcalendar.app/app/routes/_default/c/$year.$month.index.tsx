import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_default/c/$year/$month/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_default/c/$year/$month/"!</div>;
}
