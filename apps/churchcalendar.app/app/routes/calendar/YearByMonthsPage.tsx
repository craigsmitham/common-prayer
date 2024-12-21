import type { Route } from './+types/YearByMonthsPage';
import { Link } from 'react-router';
import {
  getEventsForIsoYear,
  getMonthsInSeason,
  getObservedDays,
  isSeason,
} from 'common-prayer-lib/src/church-year/church-year';
import {
  getDatesInMonth,
  isWithin,
} from 'common-prayer-lib/src/date-time/temporal-utils';
import {
  getMonthName,
  getWeekdayName,
} from 'common-prayer-lib/src/date-time/months';

export default function YearByMonthsPage({ params }: Route.ComponentProps) {
  const isoYear = parseInt(params.isoYear);

  const monthsBySeason = getEventsForIsoYear(isoYear)
    .filter(isSeason)
    .map((season) => {
      const datesByMonth = getMonthsInSeason(season)
        .map((month) => {
          const daysByDate = getDatesInMonth(month)
            .map((date) => {
              const days = getObservedDays(date)
                .filter((d) => d.date.year === isoYear)
                .filter((d) => isWithin(d.date, season));
              return { date, days };
            })
            .filter(({ days }) => days.length > 0);
          return { month, daysByDate };
        })
        .filter(({ month }) => month.year === isoYear);

      //.filter((d) => d.daysByDate.length > 0);

      const seasonContinued = season.startDate.year < isoYear;
      return { season, seasonContinued, datesByMonth };
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
      {monthsBySeason.map(({ season, seasonContinued, datesByMonth }) => (
        <div
          key={season.startDate.toString()}
          className={'border-1 border-gray-500 m-4 py-2 px-4'}
        >
          <h3 className={'text-center font-semibold'}>
            {season.name} {seasonContinued ? <span>(cont.)</span> : null}
          </h3>
          {datesByMonth.map(({ month, daysByDate }) => (
            <div key={month.toString()} className={'mb-2'}>
              <h4 className={'text-xl font-semibold'}>
                <Link to={`/${month.year}/${month.month}`}>
                  {getMonthName(month)}
                </Link>
              </h4>
              {daysByDate.map(({ date, days }) => (
                <div
                  key={date.toString()}
                  className={'flex border-t py-1 w-full mt-2'}
                >
                  <Link
                    to={`/${date.year}/${date.month}/${date.day}`}
                    className={'w-18 flex'}
                  >
                    <div className={'text-center font-semibold w-6'}>
                      {date.day}
                    </div>
                    <div className={'pl-1'}>
                      {getWeekdayName(date.dayOfWeek, 'short')}
                    </div>
                  </Link>
                  <div className={'flex-1'}>
                    {days.map((day) => (
                      <div key={day.name}>{day.name}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
