import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Temporal } from 'temporal-polyfill';
import { formatDate } from 'date-fns';
import {
  findNextDay,
  findNextPeriod,
} from 'common-prayer-lib/src/church-year/church-year';

export const Route = createFileRoute('/c/$year/$month/$day')({
  loader: (params) => {
    return params;
  },
  component: DayViewComponent,
});

function DayViewComponent() {
  const params = Route.useParams();

  const date = new Temporal.PlainDate(
    parseInt(params.year),
    parseInt(params.month),
    parseInt(params.day),
  );
  const previousDate = date.subtract({ days: 1 });
  const nextDate = date.add({ days: 1 });
  const jsDate = new Date(date.year, date.month - 1, date.day);
  const dayOfMonthDisplay = formatDate(jsDate, 'do');
  const monthDisplay = formatDate(jsDate, 'LLLL');
  const day = findNextDay(date);
  const season = findNextPeriod(date);

  return (
    <div>
      <h4>{season?.name}</h4>
      <h2>
        {dayOfMonthDisplay} of {monthDisplay}, {date.year}
      </h2>
      <ul>
        <Link
          to={`/c/${previousDate.year}/${previousDate.month}/${previousDate.day}`}
        >
          Previous
        </Link>
        <Link to={`/c/${nextDate.year}/${nextDate.month}/${nextDate.day}`}>
          Next
        </Link>
      </ul>
      <h3>{day?.name}</h3>
    </div>
  );
}
