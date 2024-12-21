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
import {
  getDatesInMonth,
  isSame,
} from 'common-prayer-lib/src/date-time/temporal-utils';
import {
  getMonthName,
  getWeekdayName,
} from 'common-prayer-lib/src/date-time/months';

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
    const datesInMonthBySeason = [
      ...Map.groupBy(
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
        .map(([season, dates]) => {
          const seasonStart = isSame(season.startDate, dates[0].date);
          return {
            season,
            seasonStart,
            dates: dates.filter(({ days }) => days.length > 0),
          };
        }),
    ];

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
      <div className={'flex gap-3 text-5xl'}>
        <Link to={`/${isoYear - 1}`}>&laquo;</Link>
        <h1>{isoYear}</h1>
        <Link to={`/${isoYear + 1}`}>&raquo;</Link>
      </div>
      <ol>
        {months.map(({ month, seasons, monthName }) => (
          <li key={month.month}>
            <h3 className={'font-semibold text-lg'}>{monthName}</h3>
            {seasons.map(({ dates, season, seasonStart }) => (
              <div key={season.slug}>
                {seasonStart || month.month === 1 ? (
                  <div className={'text-center'}>
                    {season.name}{' '}
                    {!seasonStart ? <span>(continued)</span> : null}{' '}
                  </div>
                ) : null}

                {dates.map(({ date, days }) => (
                  <div key={date.day} className={'flex border-b'}>
                    <div className={'w-15'}>
                      {date.day} {getWeekdayName(date.dayOfWeek, 'short')}
                    </div>
                    <div className={'flex-1'}>
                      {days.map((day) => (
                        <div key={day.name}>{day.name}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </li>
        ))}
      </ol>
    </div>
  );
}
