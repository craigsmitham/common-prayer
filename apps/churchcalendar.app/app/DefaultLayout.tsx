import { Temporal } from 'temporal-polyfill';
import { Link, Outlet, useLocation } from 'react-router';
import { getMonthsInYear } from 'common-prayer-lib/src/date-time/temporal-utils';
import React, { useEffect, useState } from 'react';
import { getMonthName } from 'common-prayer-lib/src/date-time/months';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { year: currentIsoYear } = Temporal.Now.plainDateISO();
  const months = getMonthsInYear(currentIsoYear);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (showMenu) {
      setShowMenu(false);
    }
    // Handle navigation
  }, [location]);

  return (
    <>
      <header>
        <div className={'flex'}>
          <div className={'flex-1'}>
            <span onClick={() => setShowMenu(true)}>Show menu</span>
          </div>
          <h1 className={'z-50 text-gray-700 p-3'}>
            <Link to={'/'}>ChurchCalendar.app</Link>
          </h1>
          <div className={'flex-1'}></div>
        </div>
        <nav
          className={`bg-white/98 fixed w-full h-full top-0 z-40  ${showMenu ? '' : 'hidden'}`}
          onClick={(e) => {
            if (
              e.nativeEvent instanceof PointerEvent &&
              (e.nativeEvent.target as HTMLElement)?.tagName.toLowerCase() ===
                'a'
            ) {
              // setShowMenu(false);
            }
          }}
        >
          <span onClick={() => setShowMenu(false)}>X</span>
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
          {true ?? (
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
          )}
        </nav>
      </header>
      <main className={'px-5'}>
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
