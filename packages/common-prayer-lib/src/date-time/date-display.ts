import { Temporal } from 'temporal-polyfill';

export function getMonthName(
  month: number,
  format?: 'long' | 'short' = 'long',
) {
  return new Temporal.PlainDate(2000, month, 1).toLocaleString('en-US', {
    month: format,
  });
}
