import type { Route } from './+types/MonthOfYearPage';
import {
  getEventsForIsoYear,
  isDay,
} from 'common-prayer-lib/src/church-year/church-year';
import { Temporal } from 'temporal-polyfill';
import { getMonthName } from 'common-prayer-lib/src/date-time/date-display';
import { getDayOfMonthDetailPath } from '~/components/DayOfMonthDetail';
import { Link } from 'react-router';

export default function MonthOfYearPage(props: Route.ComponentProps) {
  const year = parseInt(props.params.year);
  const month = parseInt(props.params.month);
  const firstOfMonth = new Temporal.PlainDate(year, month, 1);
  const days = getEventsForIsoYear(year)
    .filter((e) => isDay(e))
    .filter((d) => d.date.year === year && d.date.month === month);
  const monthDisplay = firstOfMonth.toLocaleString('en-US', {});
  const test = getMonthName(month);
  return (
    <div>
      <h1>{getMonthName(month)}</h1>
      <h2>{year}</h2>
      <ul>
        {days.map((day, index) => (
          <li key={index}>
            <Link to={getDayOfMonthDetailPath(day.date)}></Link>: {day.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
