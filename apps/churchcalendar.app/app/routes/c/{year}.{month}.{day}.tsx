import type { Route } from './+types/{year}.{month}.{day}';
import { Temporal } from 'temporal-polyfill';
import { DayViewComponent } from '~/components/DayViewComponent';

export default function Home(params: Route.ComponentProps) {
  // TODO: better error handling/404ing
  const year = parseInt(params.params.year);
  const month = parseInt(params.params.month);
  const day = parseInt(params.params.day);
  const date = new Temporal.PlainDate(year, month, day);
  return <DayViewComponent date={date} />;
}
