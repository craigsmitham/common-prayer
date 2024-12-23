import type { Route } from './+types/Home';
import { Temporal } from 'temporal-polyfill';
import { Link, useSearchParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import {
  getMonthName,
  getWeekdayName,
} from 'common-prayer-lib/src/date-time/months';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ChurchCalendar.app' },
    { name: 'description', content: 'Welcome to ChurchCalendar.app' },
  ];
}

function Today({ today }: { today: Temporal.PlainDate }) {
  return (
    <div
      className={'flex flex-col text-justify [text-align-last:center] text-3xl'}
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
