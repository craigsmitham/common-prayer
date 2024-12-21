import type { Route } from './+types/MonthOfYearPage';
import {
  getEventsForIsoYear,
  getObservedDays,
  isSeason,
} from 'common-prayer-lib/src/church-year/church-year';
import { Temporal } from 'temporal-polyfill';
import { Link } from 'react-router';
import { getMonthName } from 'common-prayer-lib/src/date-time/months';
import {
  getDatesInMonth,
  isWithin,
  periodOverlapsMonth,
} from 'common-prayer-lib/src/date-time/temporal-utils';
import { DateList } from '~/components/DateList';

export default function MonthOfYearPage(props: Route.ComponentProps) {
  const isoYear = parseInt(props.params.isoYear);
  const isoMonth = parseInt(props.params.isoMonth);
  const month = new Temporal.PlainYearMonth(isoYear, isoMonth);
  const datesBySeason = getEventsForIsoYear(isoYear)
    .filter(isSeason)
    .filter((s) => {
      return periodOverlapsMonth(s, month);
    })
    .map((season) => {
      const daysByDate = getDatesInMonth(month)
        .filter((date) => isWithin(date, season))
        .map((date) => {
          const days = getObservedDays(date);
          return { date, days };
        })
        .filter(({ days }) => days.length > 0);
      return { season, daysByDate };
    });

  const prevMonth = month.subtract({ months: 1 });
  const nextMonth = month.add({ months: 1 });

  return (
    <div>
      <h3>
        <Link to={`/${isoYear}`}> {isoYear} </Link>
      </h3>
      <h2>
        <Link
          to={`/${prevMonth.year}/${prevMonth.month}`}
          title={getMonthName(prevMonth.month)}
        >
          &laquo;
        </Link>
        &nbsp;<Link to={`/${isoYear}`}>{getMonthName(month)}</Link>&nbsp;
        <Link
          to={`/${nextMonth.year}/${nextMonth.month}`}
          title={getMonthName(nextMonth.month)}
        >
          &raquo;
        </Link>
      </h2>
      {datesBySeason.map(({ season, daysByDate }) => (
        <div>
          <div>{season.name}</div>
          <DateList daysByDate={daysByDate} />
        </div>
      ))}
    </div>
  );
}
