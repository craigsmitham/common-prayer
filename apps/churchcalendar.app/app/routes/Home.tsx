import type { Route } from './+types/Home';
import { Temporal } from 'temporal-polyfill';
import { Link, useSearchParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import {
  getMonthName,
  getWeekdayName,
} from 'common-prayer-lib/src/date-time/months';
import {
  getCurrentSeason,
  getUpcomingDaysByDate,
} from 'common-prayer-lib/src/church-year/church-year';
import { DateList } from '~/components/DateList';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ChurchCalendar.app' },
    { name: 'description', content: 'Welcome to ChurchCalendar.app' },
  ];
}

function Today({ today }: { today: Temporal.PlainDate }) {
  const upcomingEvents = getUpcomingDaysByDate(today);
  const season = getCurrentSeason(today);
  const seasonDisplay =
    season.name === 'Trinity Season' ? (
      <span>Trinity Season &middot; Ordinary Time</span>
    ) : (
      <span>Season of {season.name}</span>
    );
  return (
    <>
      <div className={'italic text-center flex h-12 items-center mb-2'}>
        <span className={'flex-1'}>{seasonDisplay}</span>
      </div>
      <div
        className={
          'flex flex-col text-justify [text-align-last:center] text-3xl'
        }
      >
        <div>Today is {getWeekdayName(today)},</div>
        <div>
          <Link
            className={'border-b-1 font-semibold'}
            to={`/${today.year}/${today.month}`}
          >
            {getMonthName(today)}
          </Link>
          &nbsp;
          <Link
            className={'border-b-1 font-semibold'}
            to={`/${today.year}/${today.month}/${today.day}`}
          >
            {today.day}
          </Link>
          ,&nbsp;
          <Link className={'border-b-1 font-semibold'} to={`/${today.year}`}>
            {today.year}
          </Link>
        </div>
      </div>
      <div className={'my-4'}>
        <h3 className={'font-bold'}>Upcoming</h3>
        <DateList daysByDate={upcomingEvents} />
      </div>
    </>
  );
}

export default function Home() {
  const [today, setToday] = useState<Temporal.PlainDate | null>(null);
  let [searchParams] = useSearchParams();

  const todayParam = searchParams.get('today');
  useEffect(() => {
    if (today == null) {
      setToday(
        todayParam != null
          ? Temporal.PlainDate.from(todayParam)
          : Temporal.Now.plainDateISO(),
      );
    }
  });

  return <div>{today ? <Today today={today} /> : null}</div>;
}
