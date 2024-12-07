import { Temporal } from 'temporal-polyfill';
import { formatDate } from 'date-fns';
import {
  findNextDay,
  getSeason,
  getUpcomingEvents,
} from 'common-prayer-lib/src/church-year/church-year';
import * as React from 'react';
import { Link } from 'react-router';

export function DayViewComponent({ date }: { date: Temporal.PlainDate }) {
  const dayViewPath = (d: Temporal.PlainDate) =>
    `/c/${d.year}/${d.month}/${d.day}`;
  const today = Temporal.Now.plainDateISO();

  const previousDate = date.subtract({ days: 1 });
  const nextDate = date.add({ days: 1 });
  const jsDate = new Date(date.year, date.month - 1, date.day);
  const dayOfWeekDisplay = formatDate(jsDate, 'EEEE');
  const dayOfMonthDisplay = formatDate(jsDate, 'do');

  const monthDisplay = formatDate(jsDate, 'LLLL');
  const day = findNextDay(date);
  const season = getSeason(date);
  const todayLink = <Link to={'/c/today'}>Today</Link>;
  const nextLink = <Link to={dayViewPath(nextDate)}>Next &raquo;</Link>;
  const prevLink = <Link to={dayViewPath(previousDate)}>&laquo; Previous</Link>;
  const upcomingEvents = getUpcomingEvents(date);
  const seasonDisplay =
    season.name === 'Trinity Season' ? (
      <span>Trinity Season &middot; Ordinary Time</span>
    ) : (
      <span>Season of {season.name}</span>
    );

  return (
    <div>
      <div className={'season text-center'}>{seasonDisplay}</div>
      <div className={'day-of-week text-center text-4xl'}>
        {dayOfWeekDisplay}
      </div>
      <div className={'day-of-month text-center text-9xl'}>{date.day}</div>
      <div className={'flex justify-center items-center gap-x-4 text-4xl'}>
        <div className={'month'}>{monthDisplay}</div>
        <div className={'year'}>{date.year}</div>
      </div>
      <hr />
      <h3>{day?.name}</h3>
      <hr />
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