import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_default/subscribe/outlook-for-desktop')(
  {
    component: RouteComponent,
  },
);

function RouteComponent() {
  return 'Hello /subscribe/outlook-for-desktop!';
}
