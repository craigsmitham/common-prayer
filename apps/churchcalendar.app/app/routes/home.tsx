import type { Route } from './+types/home';
import { Temporal } from 'temporal-polyfill';
import { Link } from 'react-router';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ChurchCalendar.app' },
    { name: 'description', content: 'Welcome to ChurchCalendar.app' },
  ];
}

export default function Home() {
  const today = Temporal.Now.plainDateISO();
  return (
    <div>
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
          <a className={'text-blue-700'} href={'https://x.com/churchcalendar_'}>
            https://x.com/churchcalendar_
          </a>
        </li>
      </ul>
      <h3 className={'pt-3 text-xl'}>Explore</h3>
      <ul>
        <li>
          Year by month:&nbsp;
          <Link className={'text-blue-700'} to={'/2025'}>
            www.churchcalendar.app/2025
          </Link>
        </li>
      </ul>
    </div>
  );
}
