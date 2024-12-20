import type { Route } from './+types/YearByMonthsPage';
import { getMonths } from 'common-prayer-lib/src/date-time/months';
import { Link } from 'react-router';

export default function YearByMonthsPage({ params }: Route.ComponentProps) {
  const months = getMonths();
  const isoYear = parseInt(params.isoYear);
  return (
    <div>
      <h1>
        <Link to={`/${isoYear - 1}`}>&laquo;</Link>&nbsp;{isoYear}&nbsp;
        <Link to={`/${isoYear + 1}`}>&raquo;</Link>
      </h1>
      {months.map((month) => (
        <div>
          <h3>
            <Link to={`/${isoYear}/${month.month}`}>{month.name}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
}
