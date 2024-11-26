import { Temporal } from 'temporal-polyfill';

export function sundayBefore(date: Temporal.PlainDate) {
  return date.subtract({ days: date.dayOfWeek === 7 ? 7 : date.dayOfWeek });
}

export function isSame(a: Temporal.PlainDate, b: Temporal.PlainDate) {
  return Temporal.PlainDate.compare(a, b) === 0;
}
export function isBefore(a: Temporal.PlainDate, b: Temporal.PlainDate) {
  return Temporal.PlainDate.compare(a, b) === -1;
}

export function isAfter(a: Temporal.PlainDate, b: Temporal.PlainDate) {
  return Temporal.PlainDate.compare(a, b) === 1;
}

export function isWithin(
  a: Temporal.PlainDate,
  {
    startDate,
    endDate,
  }: { startDate: Temporal.PlainDate; endDate: Temporal.PlainDate },
) {
  if (isSame(a, startDate) || isSame(a, endDate)) {
    return true;
  }
  return isAfter(a, startDate) && isBefore(a, endDate);
}

export function toDate(date: Temporal.PlainDate) {
  return new Date(date.year, date.month - 1, date.day);
}
