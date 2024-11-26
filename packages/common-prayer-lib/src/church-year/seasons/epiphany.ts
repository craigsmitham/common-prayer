import { Temporal } from 'temporal-polyfill';
import {
  Day,
  Event,
  Period,
} from 'common-prayer-lib/src/church-year/church-year';
import { getEasterDate } from 'common-prayer-lib/src/church-year/seasons/easter';
import { getAshWednesdayDate } from 'common-prayer-lib/src/church-year/seasons/lent';

type DaysOfEpiphany = 'Epiphany' | 'Transfiguration Sunday';

export function getEpiphanyEvents(christmas: Day<'Christmas Day'>): Event[] {
  const ashWednesday = getAshWednesdayDate(christmas.date.year + 1);
  const epiphany: Day<'Epiphany'> = {
    name: 'Epiphany',
    date: christmas.date.add(Temporal.Duration.from({ days: 12 })),
    upcoming: {
      period: 'next-season',
    },
  };
  const epiphanySeason: Period = {
    name: 'Season of Epiphany',
    startDate: epiphany.date,
    season: true,
    endDate: ashWednesday.subtract({ days: 1 }),
    upcoming: false,
  };
  return [epiphany, epiphanySeason];
}
