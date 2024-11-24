import { Temporal } from 'temporal-polyfill';

export function sundayBefore(date: Temporal.PlainDate) {
  return date.subtract({ days: date.dayOfWeek === 7 ? 7 : date.dayOfWeek });
}
