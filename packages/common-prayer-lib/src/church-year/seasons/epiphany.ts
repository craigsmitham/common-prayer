import { Temporal } from 'temporal-polyfill';
import { Day, Event } from 'common-prayer-lib/src/church-year/church-year';

type DaysOfEpiphany = 'Epiphany' | 'Transfiguration Sunday';

export function getEpiphanyEvents(christmas: Day<'Christmas Day'>): Event[] {
  const epiphany: Day<'Epiphany'> = {
    name: 'Epiphany',
    date: christmas.date.add(Temporal.Duration.from({ days: 12 })),
  };
  return [epiphany];
}
