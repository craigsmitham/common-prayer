import { sundayBefore } from 'common-prayer-lib/src/date-time/temporal-utils';
import {
  CHURCH_YEAR_SEASONS,
  type Day,
  type Event,
  type Season,
} from 'common-prayer-lib/src/church-year/church-year';
import { Temporal } from 'temporal-polyfill';
import { type ChristmasSeasonDay } from 'common-prayer-lib/src/church-year/seasons/christmas';

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

export type SeasonOfAdvent = (typeof CHURCH_YEAR_SEASONS)[0];
export type AdventSeasonEvent = Event<DaysOfAdvent, SeasonOfAdvent>;
export type AdventSeasonDay<TDay extends DaysOfAdvent = DaysOfAdvent> = Day<
  TDay,
  SeasonOfAdvent
>;

export function getAdventEvents(
  christmas: ChristmasSeasonDay<'Christmas Day'>,
): AdventSeasonEvent[] {
  const firstDateOfAdvent = getFirstDateOfAdvent(christmas.date.year);
  const christmasEve: AdventSeasonDay = {
    name: 'Christmas Eve',
    season: 'Advent',
    type: 'Day of Special Devotion',
    shortName: null,
    longName: 'The Eve of the Feast of the Nativity of Our Lord Jesus Christ',
    traditionalName: 'The Eve of the Nativity of Our Lord Jesus Christ',
    alternativeNames: [],
    description: 'Christmas Eve',
    date: christmas.date.subtract({ days: 1 }),
    upcoming: { period: 'same-season' },
  };
  const sundays: AdventSeasonDay[] = [
    {
      name: '1st Sunday of Advent',
      season: 'Advent',
      type: 'Sunday',
      shortName: null,
      longName: null,
      traditionalName: null,
      alternativeNames: [],
      description: '1st Sunday of Advent',
      date: firstDateOfAdvent,
      upcoming: { period: 'next-30-days' },
    },
    {
      name: '2nd Sunday of Advent',
      season: 'Advent',
      type: 'Sunday',
      shortName: null,
      longName: null,
      traditionalName: null,
      alternativeNames: [],
      description: '2nd Sunday of Advent',
      date: firstDateOfAdvent.add({ weeks: 1 }),
      upcoming: { period: 'same-season' },
    },
    {
      name: '3rd Sunday of Advent',
      season: 'Advent',
      type: 'Sunday',
      shortName: null,
      longName: null,
      traditionalName: null,
      alternativeNames: [],
      description: '3rd Sunday of Advent',
      date: firstDateOfAdvent.add({ weeks: 2 }),
      upcoming: { period: 'same-season' },
    },
    {
      name: '4th Sunday of Advent',
      season: 'Advent',
      type: 'Sunday',
      shortName: null,
      longName: null,
      traditionalName: null,
      alternativeNames: [],
      description: '4th Sunday of Advent',
      date: firstDateOfAdvent.add({ weeks: 3 }),
      upcoming: { period: 'same-season' },
    },
  ];

  const adventSeason: Season<SeasonOfAdvent> = {
    name: 'Advent',
    slug: 'advent',
    isSeason: true,
    color: 'purple',
    type: 'Season',
    shortName: null,
    longName: 'Season of Advent',
    traditionalName: null,
    alternativeNames: [],
    calendarSummary: 'Advent Season',
    startDate: firstDateOfAdvent,
    endDate: christmasEve.date,
    season: 'Advent',
    upcoming: {
      period: 'next-season',
    },
  };
  return [...sundays, christmasEve, adventSeason];
}
