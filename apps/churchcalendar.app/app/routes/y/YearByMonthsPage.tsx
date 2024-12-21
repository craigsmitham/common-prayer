import type { Route } from './+types/YearByMonthsPage';
import { Link } from 'react-router';
import {
  type Day,
  getObservedDays,
  getSeasonForDate,
  type Season,
} from 'common-prayer-lib/src/church-year/church-year';
import { Temporal } from 'temporal-polyfill';
import { count } from 'common-prayer-lib/src/array';
import { getDatesInMonth } from 'common-prayer-lib/src/date-time/temporal-utils';
import { getMonthName } from 'common-prayer-lib/src/date-time/months';

interface MonthlyObservancesBySeason {
  season: Season;
  days: DailyObservancesByDate[];
}
interface DailyObservancesByDate {
  date: number;
  observances: Day<any, any>[];
}

interface ObservancesByMonth {
  isoMonth: number;
  name: string;
  seasons: MonthlyObservancesBySeason[];
}

export default function YearByMonthsPage({ params }: Route.ComponentProps) {
  const isoYear = parseInt(params.isoYear);

  const months = count(12).map((_, i) => {
    const month = new Temporal.PlainYearMonth(isoYear, i + 1);
    const datesInMonthBySeason = Map.groupBy(
      getDatesInMonth(month).map((date) => {
        const season = getSeasonForDate(date);
        const days = getObservedDays(date);
        return {
          season,
          date,
          days,
        };
      }),
      (sg) => sg.season,
    )
      .entries()
      .map(([season, dates]) => ({ season, dates }));

    return {
      month,
      monthName: getMonthName(month.month),
      seasons: datesInMonthBySeason,
    };
  });

  // Group by month
  // Group by season
  // Group by day

  return (
    <div>
      <h1>
        <Link to={`/${isoYear - 1}`}>&laquo;</Link>&nbsp;{isoYear}&nbsp;
        <Link to={`/${isoYear + 1}`}>&raquo;</Link>
      </h1>
      {months.map((month) => (
        <div key={month.month.month}>
          <h3>{month.monthName}</h3>
        </div>
      ))}
      test
    </div>
  );
}
