import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_default/subscribe/google-calendar')({
  component: RouteComponent,
});

function RouteComponent() {
  return 'Hello /subscribe/google-calendar!';
}
