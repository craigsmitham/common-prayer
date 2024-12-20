import type { Route } from './+types/YearByMonthsPage';
import { getMonths } from 'common-prayer-lib/src/date-time/months';
import { Link } from 'react-router';

export default function YearByMonthsPage({ params }: Route.ComponentProps) {
  const months = getMonths();
  const year = params.year;
  return (
    <div>
      <h1>{year} by months</h1>
      {months.map((month) => (
        <div>
          <h3>
            <Link to={`/${year}/${month.month}`}>{month.name}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
}
