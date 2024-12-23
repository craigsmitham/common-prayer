import type { Route } from './+types/YearPage';
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
import { getMonthName } from 'common-prayer-lib/src/date-time/months';
import { DateList } from '~/components/DateList';

export default function YearPage({ params }: Route.ComponentProps) {
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

      const seasonContinued = season.startDate.year < isoYear;
      return { season, seasonContinued, datesByMonth };
    });

  return (
    <div>
      <div className={'flex gap-3 text-5xl '}>
        <div className={'flex-1'}></div>
        <Link to={`/${isoYear - 1}`}>&laquo;</Link>
        <h1>{isoYear}</h1>
        <Link to={`/${isoYear + 1}`}>&raquo;</Link>
        <div className={'flex-1'}></div>
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
              <DateList daysByDate={daysByDate} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
