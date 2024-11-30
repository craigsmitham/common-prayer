import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Temporal } from 'temporal-polyfill';
import { DayViewComponent } from '../../../components/DayViewComponent';

export const Route = createFileRoute('/_default/c/today')({
  component: RouteComponent,
});

function RouteComponent() {
  return <DayViewComponent date={Temporal.Now.plainDateISO()} />;
}
