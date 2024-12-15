import type { Route } from './+types/DayOfMonthPage';
import { Temporal } from 'temporal-polyfill';
import { DayOfMonthDetail } from '~/components/DayOfMonthDetail';

export default function DayOfMonthPage(props: Route.ComponentProps) {
  const year = parseInt(props.params.year);
  const month = parseInt(props.params.month);
  const day = parseInt(props.params.day);
  const date = new Temporal.PlainDate(year, month, day);
  return <DayOfMonthDetail date={date} />;
}
