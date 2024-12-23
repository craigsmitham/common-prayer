import type { Route } from './+types/DayPage';
import { Temporal } from 'temporal-polyfill';
import { DayOfMonthDetail } from '~/components/DayOfMonthDetail';

export default function DayPage(props: Route.ComponentProps) {
  const isoYear = parseInt(props.params.isoYear);
  const isoMonth = parseInt(props.params.isoMonth);
  const isoDay = parseInt(props.params.isoDay);
  const date = new Temporal.PlainDate(isoYear, isoMonth, isoDay);
  return <DayOfMonthDetail date={date} />;
}
