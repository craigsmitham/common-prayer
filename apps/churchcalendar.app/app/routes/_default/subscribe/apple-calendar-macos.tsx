import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_default/subscribe/apple-calendar-macos',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /subscribe/apple-calendar-macos!';
}
