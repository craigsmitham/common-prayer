import { Temporal } from 'temporal-polyfill';

export function sundayBefore(date: Temporal.PlainDate) {
  return date.subtract({ days: date.dayOfWeek === 7 ? 7 : date.dayOfWeek });
}

export function sundayAfter(date: Temporal.PlainDate) {
  return date.add({ days: date.dayOfWeek === 7 ? 7 : 7 - date.dayOfWeek });
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

export function getDatesInMonth({
  year,
  month,
  daysInMonth,
}: Temporal.PlainYearMonth): Temporal.PlainDate[] {
  return [...new Array(daysInMonth)].map(
    (_, i) => new Temporal.PlainDate(year, month, i + 1),
  );
}

export function getMonthsInYear(isoYear: number): Temporal.PlainYearMonth[] {
  return [...new Array(12)].map(
    (_, i) => new Temporal.PlainYearMonth(isoYear, i + 1),
  );
}

export function periodOverlapsMonth(
  {
    startDate,
    endDate,
  }: { startDate: Temporal.PlainDate; endDate: Temporal.PlainDate },
  yearMonth: Temporal.PlainYearMonth,
) {
  // Convert the yearMonth to start and end dates
  const monthStart = yearMonth.toPlainDate({ day: 1 });
  const monthEnd = yearMonth.toPlainDate({ day: yearMonth.daysInMonth });

  // Check if the periods overlap:
  // Period starts before or during the month AND ends during or after the month
  return (
    Temporal.PlainDate.compare(startDate, monthEnd) <= 0 &&
    Temporal.PlainDate.compare(endDate, monthStart) >= 0
  );
}
