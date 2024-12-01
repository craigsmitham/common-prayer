import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Temporal } from 'temporal-polyfill';
import { formatDate } from 'date-fns';
import {
  findNextDay,
  findNextPeriod,
  getUpcomingEvents,
} from 'common-prayer-lib/src/church-year/church-year';
import { DayViewComponent } from '../../../components/DayViewComponent';

export const Route = createFileRoute('/_default/c/today')({
  component: RouteComponent,
});

function RouteComponent() {
  return <DayViewComponent date={Temporal.Now.plainDateISO()} />;
}
