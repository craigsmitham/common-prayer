import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { Temporal } from 'temporal-polyfill';
import { DayViewComponent } from '../../../components/DayViewComponent';

export const Route = createFileRoute('/_default/c/$year/$month/$day')({
  loader: (params) => {
    return params;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const params = Route.useParams();
  const date = new Temporal.PlainDate(
    parseInt(params.year),
    parseInt(params.month),
    parseInt(params.day),
  );
  return <DayViewComponent date={date} />;
}
