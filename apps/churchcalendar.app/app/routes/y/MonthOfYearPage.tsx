import type { Route } from './+types/MonthOfYearPage';
import {
  getEventsForIsoYear,
  isDay,
} from 'common-prayer-lib/src/church-year/church-year';
import { Temporal } from 'temporal-polyfill';
import { getDayOfMonthDetailPath } from '~/components/DayOfMonthDetail';
import { Link } from 'react-router';
import { getMonthName } from 'common-prayer-lib/src/date-time/months';

export default function MonthOfYearPage(props: Route.ComponentProps) {
  const isoYear = parseInt(props.params.isoYear);
  const isoMonth = parseInt(props.params.isoMonth);
  const month = new Temporal.PlainYearMonth(isoYear, isoMonth);
  const prevMonth = month.subtract({ months: 1 });
  const nextMonth = month.add({ months: 1 });
  const firstOfMonth = new Temporal.PlainDate(isoYear, isoMonth, 1);
  const observedDays = getEventsForIsoYear(isoYear)
    .filter((e) => isDay(e))
    .filter((d) => d.date.year === isoYear && d.date.month === isoMonth);

  // TODO: group observed days by day, render in groups

  return (
    <div>
      <h1>{getMonthName(isoMonth)}</h1>
      <h2>
        <Link
          to={`/${prevMonth.year}/${prevMonth.month}`}
          title={getMonthName(prevMonth.month)}
        >
          &laquo;
        </Link>
        &nbsp;<Link to={`/${isoYear}`}>{isoYear}</Link>&nbsp;
        <Link
          to={`/${nextMonth.year}/${nextMonth.month}`}
          title={getMonthName(nextMonth.month)}
        >
          &raquo;
        </Link>
      </h2>
      <ul>
        {observedDays.map((day, index) => (
          <li key={index}>
            <Link to={getDayOfMonthDetailPath(day.date)}>{day.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
