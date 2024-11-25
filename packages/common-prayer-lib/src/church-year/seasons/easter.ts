import { Temporal } from 'temporal-polyfill';
import { Day, Event } from 'common-prayer-lib/src/church-year/church-year';

export type DaysOfEaster = 'Easter Sunday' | 'Ascension Sunday';

const div = (dividend: number, divider: number): number =>
  Math.floor(dividend / divider);

export function getEasterDate(isoYear: number): Temporal.PlainDate {
  const a = isoYear % 19;
  const b = div(isoYear, 100);
  const c = isoYear % 100;
  const d = div(b, 4);
  const e = b % 4;
  const f = div(b + 8, 25);
  const g = div(b - f + 1, 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = div(c, 4);
  const k = c % 4;
  const ℓ = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = div(a + 11 * h + 22 * ℓ, 451);
  const isoMonth = div(h + ℓ - 7 * m + 114, 31);
  const isoDay = ((h + ℓ - 7 * m + 114) % 31) + 1;
  return new Temporal.PlainDate(isoYear, isoMonth, isoDay);
}

export function getEasterDay(isoYear: number): Day<'Easter Sunday'> {
  const date = getEasterDate(isoYear);
  return {
    name: 'Easter Sunday',
    description: `Easter day ${date.year}`,
    date,
  };
}

export function getEasterEvents(easter: Day<'Easter Sunday'>): Event[] {
  return [easter];
}
