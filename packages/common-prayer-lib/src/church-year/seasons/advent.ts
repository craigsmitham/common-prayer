import { sundayBefore } from 'common-prayer-lib/src/date-time/temporal-utils';
import {
  Day,
  Period,
  Event,
} from 'common-prayer-lib/src/church-year/church-year';
import { Temporal } from 'temporal-polyfill';

export type DaysOfAdvent =
  | '1st Sunday of Advent'
  | '2nd Sunday of Advent'
  | '3rd Sunday of Advent'
  | '4th Sunday of Advent'
  | 'Christmas Eve';

export function getFirstDateOfAdvent(isoYear: number) {
  return sundayBefore(new Temporal.PlainDate(isoYear, 12, 25)).subtract({
    weeks: 3,
  });
}

export type SeasonOfAdvent = 'Advent';

export type AdventEvent = Event<SeasonOfAdvent, DaysOfAdvent>;

export function getAdventEvents(
  christmas: Day<'Christmas Day'>,
): AdventEvent[] {
  const firstDateOfAdvent = getFirstDateOfAdvent(christmas.date.year);
  const christmasEve: Day<'Christmas Eve'> = {
    name: 'Christmas Eve',
    description: 'Christmas Eve',
    date: christmas.date.subtract({ days: 1 }),
    upcoming: { period: 'same-season' },
  };
  const sundays: Day<DaysOfAdvent>[] = [
    {
      name: '1st Sunday of Advent',
      description: '1st Sunday of Advent',
      date: firstDateOfAdvent,
      upcoming: { period: 'next-30-days' },
    },
    {
      name: '2nd Sunday of Advent',
      description: '2nd Sunday of Advent',
      date: firstDateOfAdvent.add({ weeks: 1 }),
      upcoming: { period: 'same-season' },
    },
    {
      name: '3rd Sunday of Advent',
      description: '3rd Sunday of Advent',
      date: firstDateOfAdvent.add({ weeks: 2 }),
      upcoming: { period: 'same-season' },
    },
    {
      name: '4th Sunday of Advent',
      description: '4th Sunday of Advent',
      date: firstDateOfAdvent.add({ weeks: 3 }),
      upcoming: { period: 'same-season' },
    },
  ];
  const adventSeason: Period<SeasonOfAdvent> = {
    name: 'Advent',
    calendarSummary: 'Advent Season',
    startDate: firstDateOfAdvent,
    endDate: christmasEve.date,
    season: true,
    upcoming: false,
  };
  return [...sundays, christmasEve, adventSeason];
}
