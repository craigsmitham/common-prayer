import { Temporal } from 'temporal-polyfill';

type MonthNameOptions = {
  format?: 'long' | 'short';
  locale?: Intl.LocalesArgument;
};
export function getMonthName(
  isoMonth: number | { month: number },
  options?: MonthNameOptions,
): string {
  let _isoMonth: number =
    typeof isoMonth === 'number' ? isoMonth : isoMonth.month;
  return new Intl.DateTimeFormat(options?.locale ?? 'en-US', {
    month: options?.format ?? 'long',
  }).format(new Date(0, _isoMonth - 1));
}
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const date = new Date();
const dayName = days[date.getDay()];

export function getWeekdayName(isoDayOfWeek: number, format: 'long' | 'short') {
  return new Temporal.PlainDate(2024, 7, isoDayOfWeek).toLocaleString('en-US', {
    weekday: format,
  });
}
