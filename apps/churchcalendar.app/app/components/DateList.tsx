import type { Day } from 'common-prayer-lib/src/church-year/church-year';
import type { Temporal } from 'temporal-polyfill';
import { Link } from 'react-router';
import { getWeekdayName } from 'common-prayer-lib/src/date-time/months';

export function DateList(props: {
  daysByDate: { date: Temporal.PlainDate; days: Day<any, any>[] }[];
}) {
  return props.daysByDate.map(({ date, days }) => (
    <div key={date.toString()} className={'flex border-t py-1 w-full mt-2'}>
      <Link
        to={`/${date.year}/${date.month}/${date.day}`}
        className={'w-18 flex'}
      >
        <div className={'text-center font-semibold w-6'}>{date.day}</div>
        <div className={'pl-1'}>{getWeekdayName(date.dayOfWeek, 'short')}</div>
      </Link>
      <div className={'flex-1'}>
        {days.map((day) => (
          <div key={day.name}>{day.name}</div>
        ))}
      </div>
    </div>
  ));
}
