import type { Route } from './+types/{year}';
import {
  getEventsForIsoYear,
  isDay,
} from 'common-prayer-lib/src/church-year/church-year';

export default function Home(params: Route.ComponentProps) {
  // TODO: better error handling/404ing
  const year = parseInt(params.params.year);
  const events = getEventsForIsoYear(year).filter((e) => isDay(e));

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
