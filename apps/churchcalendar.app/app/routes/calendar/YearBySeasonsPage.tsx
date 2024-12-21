import type { Route } from './+types/YearBySeasonsPage';
import { Link } from 'react-router';
import {
  getEventsForEasterIsoYear,
  isSeason,
} from 'common-prayer-lib/src/church-year/church-year';

export function getYearPagePath(year: number) {
  return `/y/${year}`;
}
export default function YearBySeasonsPage(props: Route.ComponentProps) {
  const year = parseInt(props.params.year);
  const previousYear = year - 1;
  const nextYear = year + 1;
  const seasons = getEventsForEasterIsoYear(year).filter(isSeason);
  return (
    <div>
      <h1>{props.params.year}</h1>
      <ul>
        <li>
          <Link to={getYearPagePath(previousYear)}>&laquo; {previousYear}</Link>
        </li>
        <li>
          <Link to={getYearPagePath(nextYear)}>{nextYear} &raquo;</Link>
        </li>
      </ul>
      <h2>Seasons</h2>
      <ul>
        {seasons.map((season) => (
          <li key={season.name}>
            <Link to={`/y/${season.startDate.year}/s/${season.slug}`}>
              {season.name}{' '}
              {season.startDate.year !== year
                ? `(${season.startDate.year})`
                : ''}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
