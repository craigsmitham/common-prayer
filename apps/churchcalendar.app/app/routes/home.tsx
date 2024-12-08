import type { Route } from './+types/home';
import { Temporal } from 'temporal-polyfill';
import { DayViewComponent } from '~/components/DayViewComponent';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'ChurchCalendar.app' },
    { name: 'description', content: 'Welcome to ChurchCalendar.app' },
  ];
}

export default function Home() {
  const today = Temporal.Now.plainDateISO();
  return <DayViewComponent date={today} />;
}
