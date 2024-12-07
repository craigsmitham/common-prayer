import type { Route } from './+types/home';
import { Temporal } from 'temporal-polyfill';
import { DayViewComponent } from '~/components/DayViewComponent';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  const today = Temporal.Now.plainDateISO();
  return <DayViewComponent date={today} />;
}
