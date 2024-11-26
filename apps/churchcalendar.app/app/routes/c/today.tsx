import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { DayViewRouteComponent } from './$year.$month.$day';
import { Temporal } from 'temporal-polyfill';
import { formatDate } from 'date-fns';
import {
  findNextDay,
  findNextPeriod,
  getUpcomingEvents,
} from 'common-prayer-lib/src/church-year/church-year';
import {
  isAfter,
  isBefore,
  isSame,
} from 'common-prayer-lib/src/date-time/temporal-utils';

export const Route = createFileRoute('/c/today')({
  component: RouteComponent,
});

function RouteComponent() {
  const test = '';
  return <DayViewComponent date={Temporal.Now.plainDateISO()} />;
}

export function DayViewComponent({ date }: { date: Temporal.PlainDate }) {
  const dayViewPath = (d: Temporal.PlainDate) =>
    `/c/${d.year}/${d.month}/${d.day}`;
  const today = Temporal.Now.plainDateISO();
  const previousDate = date.subtract({ days: 1 });
  const nextDate = date.add({ days: 1 });
  const jsDate = new Date(date.year, date.month - 1, date.day);
  const dayOfMonthDisplay = formatDate(jsDate, 'do');
  const monthDisplay = formatDate(jsDate, 'LLLL');
  const day = findNextDay(date);
  const season = findNextPeriod(date);
  const todayLink = <Link to={'/c/today'}>Today</Link>;
  const nextLink = <Link to={dayViewPath(nextDate)}>Next &raquo;</Link>;
  const prevLink = <Link to={dayViewPath(previousDate)}>&laquo; Previous</Link>;
  const upcomingEvents = getUpcomingEvents(date);

  return (
    <div>
      <h4>{season?.name}</h4>
      <h2>
        {dayOfMonthDisplay} of {monthDisplay}, {date.year}
      </h2>
      {prevLink} | {todayLink} | {nextLink}
      <h3>{day?.name}</h3>
      <h3>Upcoming</h3>
      <ul>
        {upcomingEvents.map(({ event, upcomingDate }) => {
          return (
            <li key={event.name}>
              {event.name}:{' '}
              <Link to={dayViewPath(upcomingDate)}>
                {upcomingDate.toString()}
              </Link>
              {event.upcoming !== false && event.upcoming.countdown && (
                <span>
                  &nbsp; ({date.until(upcomingDate).days}{' '}
                  {date.until(upcomingDate).days === 1 ? 'day' : 'days'})
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
