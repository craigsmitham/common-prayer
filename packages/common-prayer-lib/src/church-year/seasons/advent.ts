import { sundayBefore } from 'common-prayer-lib/src/date-time/temporal-utils';
import {
  Day,
  Period,
  Event,
} from 'common-prayer-lib/src/church-year/church-year';

type DaysOfAdvent =
  | '1st Sunday of Advent'
  | '2nd Sunday of Advent'
  | '3rd Sunday of Advent'
  | '4th Sunday of Advent'
  | 'Christmas Eve';

export function getAdventEvents(christmas: Day<'Christmas Day'>): Event[] {
  const firstDateOfAdvent = sundayBefore(christmas.date).subtract({ weeks: 3 });
  const christmasEve: Day<'Christmas Eve'> = {
    name: 'Christmas Eve',
    description: 'Christmas Eve',
    date: christmas.date.subtract({ days: 1 }),
  };
  const sundays: Day<DaysOfAdvent>[] = [
    {
      name: '1st Sunday of Advent',
      description: '1st Sunday of Advent',
      date: firstDateOfAdvent,
    },
    {
      name: '2nd Sunday of Advent',
      description: '2nd Sunday of Advent',
      date: firstDateOfAdvent.add({ weeks: 1 }),
    },
    {
      name: '3rd Sunday of Advent',
      description: '3rd Sunday of Advent',
      date: firstDateOfAdvent.add({ weeks: 2 }),
    },
    {
      name: '4th Sunday of Advent',
      description: '4th Sunday of Advent',
      date: firstDateOfAdvent.add({ weeks: 3 }),
    },
  ];
  const adventSeason: Period = {
    name: 'Advent',
    calendarSummary: 'Advent Season',
    startDate: firstDateOfAdvent,
    endDate: christmasEve.date,
  };
  return [...sundays, christmasEve, adventSeason];
}
