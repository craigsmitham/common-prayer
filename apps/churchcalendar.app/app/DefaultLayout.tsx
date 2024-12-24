import { Temporal } from 'temporal-polyfill';
import { Link, Outlet, useLocation, useSearchParams } from 'react-router';
import { getMonthsInYear } from 'common-prayer-lib/src/date-time/temporal-utils';
import React, { useEffect, useState } from 'react';
import { getMonthName } from 'common-prayer-lib/src/date-time/months';
import { tv } from 'tailwind-variants';

const colorVariants = tv({
  slots: {
    colorContainer: '',
  },
  variants: {
    color: {
      // Ordinary time, Epiphany
      green: {},
      // Holy week, pentecost, feast days of martyred saints
      red: {},
      // Christmas, Easter, Feat of the Epiphany, All  Saints
      white: {},
      // Third sunday of advent, fourth sunday of lent (tailwind: rose)
      rose: {},
      // Advent/Lent (tailwind: purple)
      purple: {},
      // Ash Wednesday, Good Friday, etc (tailwind: stone)
      black: {},
    },
  },
});

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { year: currentIsoYear } = Temporal.Now.plainDateISO();
  const months = getMonthsInYear(currentIsoYear);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    if (showMenu) {
      setShowMenu(false);
    }
    // Handle navigation
  }, [location]);

  return (
    <>
      <header className={'h-12 '}>
        <div className={'flex '}>
          <div className={'flex-1  '}>
            <span
              className={
                'w-12 h-12 flex items-center justify-center cursor-pointer'
              }
              onClick={() => setShowMenu(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </span>
          </div>
          <h1 className={'z-50 text-gray-700 h-12 flex items-center'}>
            <Link className={'  '} to={'/'}>
              ChurchCalendar.app
            </Link>
          </h1>
          <div className={'flex-1'}></div>
        </div>
        <nav
          className={`bg-white/98 fixed w-full h-full top-0 z-40  ${showMenu ? '' : 'hidden'}`}
        >
          <div
            className={
              'w-12 h-12 flex justify-center items-center cursor-pointer'
            }
            onClick={() => setShowMenu(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <ul className={`text-center flex flex-col gap-10 p-5 text-5xl`}>
            <li>
              <Link to={'/'}>Today</Link>
            </li>
            <li>
              <Link className={'opacity-30'} to={`/${currentIsoYear - 1}`}>
                {currentIsoYear - 1}
              </Link>
              &nbsp;
              <Link to={`/${currentIsoYear}`}>{currentIsoYear}</Link>&nbsp;
              <Link className={'opacity-30'} to={`/${currentIsoYear + 1}`}>
                {currentIsoYear + 1}
              </Link>
            </li>
            <li className={'grid grid-rows-3 grid-cols-3 text-2xl'}>
              {months.map((m) => (
                <Link key={m.month} to={`/${m.year}/${m.month}`}>
                  {getMonthName(m, { format: 'short' })}
                </Link>
              ))}
            </li>
            <li>
              <Link to={`/about`}>About</Link>
            </li>
          </ul>
          {
            <ul className={'flex'}>
              <li>
                <Link to={`https://x.com/churchcalendar_`}>X</Link>
              </li>
              <li>
                <Link to={`https://bsky.app/profile/churchcalendar.app`}>
                  bsky
                </Link>
              </li>
            </ul>
          }
        </nav>
      </header>
      <main className={'px-4 pb-4'}>
        {children}
        <Outlet />

        <div className={'py-5'}>
          <div>👷‍♀️👷‍♂️UNDER CONSTRUCTION🪚🛠️</div>
          Read more about this project:{' '}
          <ul>
            <li>
              <a
                className={'text-blue-700'}
                href={
                  'https://docs.google.com/document/d/e/2PACX-1vTMk-Nxo5Z1pzd9sM2ktEyIsNQ2II6YxvPS4jYuIbcVFeN3qtIkkH3450WHQYXzxtW27FCZaXqzYJov/pub'
                }
              >
                ChurchCalendar.app: Software Brief + Spec
              </a>
            </li>
            <li>
              Stay updated:{' '}
              <a
                className={'text-blue-700'}
                href={'https://x.com/churchcalendar_'}
              >
                https://x.com/churchcalendar_
              </a>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
