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

export function getWeekdayName(
  isoDayOfWeek: number | Temporal.PlainDate,
  format: 'long' | 'short' = 'long',
): string {
  const _isoDayOfWeek =
    typeof isoDayOfWeek === 'number' ? isoDayOfWeek : isoDayOfWeek.dayOfWeek;
  return new Temporal.PlainDate(2024, 7, _isoDayOfWeek).toLocaleString(
    'en-US',
    {
      weekday: format,
    },
  );
}
