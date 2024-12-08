import type { Route } from './+types/{year}.{month}';
import {
  getEventsForIsoYear,
  isDay,
} from 'common-prayer-lib/src/church-year/church-year';

export default function YearMonthViewPageComponent(
  params: Route.ComponentProps,
) {
  // TODO: better error handling/404ing
  const year = parseInt(params.params.year);
  const month = parseInt(params.params.month);
  const events = getEventsForIsoYear(year)
    .filter((e) => isDay(e))
    .filter((e) => e.date.month === month);
  console.log(events);
  console.log(params);

  return (
    <ul>
      {events.map((event) => (
        <li key={event.name}>
          {event.date.month} {event.date.day} {event.name}
        </li>
      ))}
      <li></li>
    </ul>
  );
}
