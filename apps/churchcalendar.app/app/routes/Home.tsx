import type { Route } from './+types/Home';
import { Temporal } from 'temporal-polyfill';
import { Link, useSearchParams } from 'react-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  getMonthName,
  getWeekdayName,
} from 'common-prayer-lib/src/date-time/months';
import {
  type Day,
  getCurrentSeason,
  getObservedDays,
  getUpcomingDaysByDate,
  type Season,
} from 'common-prayer-lib/src/church-year/church-year';
import { DateList } from '~/components/DateList';
import { isSame } from 'common-prayer-lib/src/date-time/temporal-utils';

const FitText = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const fitText = () => {
    if (!containerRef.current || !textRef.current) return;

    const container = containerRef.current;
    const text = textRef.current;
    /*
    console.log({
      containerRef,
      textRef,
      container,
      text,
    });*/
    let fontSize = 1;
    text.style.fontSize = fontSize + 'px';

    while (text.offsetWidth < container.offsetWidth) {
      fontSize++;
      text.style.fontSize = fontSize + 'px';
    }
    /*
    console.log({
      text: {
        text,
        offsetWidth: text.offsetWidth,
        offsetHeight: text.offsetHeight,
      },
      container: {
        container,
        offsetWidth: container.offsetWidth,
        offsetHeight: container.offsetHeight,
      },
    });*/
    text.style.fontSize = fontSize - 1 + 'px';
  };

  useEffect(() => {
    fitText();
    window.addEventListener('resize', fitText);
    return () => window.removeEventListener('resize', fitText);
  }, []);

  return (
    <div ref={containerRef} className="w-full ">
      <div ref={textRef} className="whitespace-nowrap inline">
        {children}
      </div>
    </div>
  );
};

function getSeasonDisplayName(season: Season) {
  switch (season.slug) {
    case 'advent':
      return 'Advent Season';
    case 'christmas':
      return 'Christmastide';
    case 'epiphany':
      return 'Epiphany Season';
    case 'lent':
      return 'Season of Lent';
    case 'easter':
      return 'Easter Season';
    case 'trinity-season':
      break;
  }
  return season.slug;
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ChurchCalendar.app' },
    { name: 'description', content: 'Welcome to ChurchCalendar.app' },
  ];
}

const CurrentSeason = ({ today }: { today: Temporal.PlainDate }) => {
  const currentSeason = getCurrentSeason(today);
  if (isSame(currentSeason.startDate, today)) {
    return <span>The season of {currentSeason.name} begins.</span>;
  }
  return <span>We are in the season of {currentSeason.name}.</span>;
};

function Today({ today }: { today: Temporal.PlainDate }) {
  const upcomingEvents = getUpcomingDaysByDate(today);
  const season = getCurrentSeason(today);
  const observedDays = getObservedDays(today);
  const primaryObservance: Day<any, any> | undefined = observedDays[0];
  const alsoObservedToday = observedDays.slice(1);

  return (
    <>
      <div
        className={
          'flex flex-col text-justify [text-align-last:center] text-3xl'
        }
      >
        <div>
          <FitText>Today is {getWeekdayName(today)},</FitText>
        </div>
        <div>
          <FitText>
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
          </FitText>
        </div>
        {primaryObservance ? (
          <div>
            <FitText>{primaryObservance.name}</FitText>
          </div>
        ) : null}
      </div>
      <div>
        <CurrentSeason today={today} />
      </div>
      <ul>
        {alsoObservedToday.map((d, i) => {
          return (
            <div key={d.name}>
              {i === 0 ? (
                <div className={'font-bold'}></div>
              ) : (
                <div>{d.name}</div>
              )}
            </div>
          );
        })}
      </ul>
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
