import type { Route } from './+types/home';
import { Temporal } from 'temporal-polyfill';
import { DayOfMonthDetail } from '~/components/DayOfMonthDetail';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ChurchCalendar.app' },
    { name: 'description', content: 'Welcome to ChurchCalendar.app' },
  ];
}

export default function Home() {
  const today = Temporal.Now.plainDateISO();
  return <DayOfMonthDetail date={today} />;
}
