import { Temporal } from 'temporal-polyfill';
import {
  Day,
  Event,
  Period,
} from 'common-prayer-lib/src/church-year/church-year';
import { EasterSeasonDay } from 'common-prayer-lib/src/church-year/seasons/easter';

const daysOfChristmas = [
  '2nd Day of Christmas',
  '3rd Day of Christmas',

  '4th Day of Christmas',
  '5th Day of Christmas',
  '6th Day of Christmas',
  '7th Day of Christmas',
  '8th Day of Christmas',
  '9th Day of Christmas',
  '10th Day of Christmas',
  '11th Day of Christmas',
  '12th Day of Christmas',
] as const;

export type DaysOfChristmas =
  | (typeof daysOfChristmas)[number]
  | 'Christmas Day';

export type SeasonOfChristmas = 'Christmas';
export type ChristmasSeasonEvent = Event<DaysOfChristmas, SeasonOfChristmas>;
export type ChristmasSeasonDay<TDay extends DaysOfChristmas> = Day<
  TDay,
  SeasonOfChristmas
>;

export function getChristmasEvents(
  christmas: ChristmasSeasonDay<'Christmas Day'>,
): ChristmasSeasonEvent[] {
  const daysAfterChristmas = daysOfChristmas.map<
    ChristmasSeasonDay<DaysOfChristmas>
  >((name, i) => {
    return {
      name,
      season: 'Christmas',
      type: 'Day of Special Devotion',
      shortName: null,
      longName: null,
      traditionalName: null,
      alternativeNames: [],
      description: name,
      date: christmas.date.add({ days: i + 1 }),
      upcoming: false,
    };
  });
  const christmasSeason: Period<SeasonOfChristmas, SeasonOfChristmas> = {
    name: 'Christmas',
    type: 'Season',
    season: 'Christmas',
    isSeason: true,
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    calendarSummary: 'Christmastide',
    startDate: christmas.date,
    endDate: christmas.date.add({ days: 11 }),
    upcoming: false,
  };
  return [christmas, ...daysAfterChristmas, christmasSeason];
}

export function getChristmasDay(
  easter: EasterSeasonDay<'Easter Sunday'>,
): ChristmasSeasonDay<'Christmas Day'> {
  const date = new Temporal.PlainDate(easter.date.year - 1, 12, 25);
  return {
    name: 'Christmas Day',
    type: 'Principal Feast',
    season: 'Christmas',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    description: `Christmas day ${date.year}`,
    upcoming: {
      countdown: true,
      period: 'next-season',
    },
    date: date,
  };
}
