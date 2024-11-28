import { Temporal } from 'temporal-polyfill';
import {
  Day,
  Event,
  Period,
} from 'common-prayer-lib/src/church-year/church-year';
import { sundayAfter } from 'common-prayer-lib/src/date-time/temporal-utils';

export type SeasonOfEaster = 'Easter';
export type DaysOfEaster =
  | 'Easter Sunday'
  | 'Ascension Day'
  | 'Feast of Pentecost'
  | 'Sunday after Ascension Day';

export type EasterSeasonEvent = Event<DaysOfEaster, SeasonOfEaster>;
export type EasterSeasonDay<TDay extends DaysOfEaster> = Day<
  TDay,
  SeasonOfEaster
>;

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

export function getEasterDay(
  isoYear: number,
): EasterSeasonDay<'Easter Sunday'> {
  const date = getEasterDate(isoYear);
  return {
    name: 'Easter Sunday',
    season: 'Easter',
    type: 'Principal Feast',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    description: `Easter day ${date.year}`,
    date: date,
    upcoming: {
      countdown: true,
      period: 'next-season',
    },
  };
}

export function getDateOfPentecost(isoYear: number) {
  const ed = getEasterDate(isoYear);
  return ed.add({ weeks: 7 });
}

export function getEasterEvents(
  easter: EasterSeasonDay<'Easter Sunday'>,
): EasterSeasonEvent[] {
  const ascensionDay: EasterSeasonDay<'Ascension Day'> = {
    name: 'Ascension Day',
    season: 'Easter',
    type: 'Principal Feast',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    date: easter.date.add({ days: 39 }),
    upcoming: {
      period: 'same-season',
    },
  };
  const ascensionSunday: EasterSeasonDay<'Sunday after Ascension Day'> = {
    name: 'Sunday after Ascension Day',
    season: 'Easter',
    type: 'x',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    date: sundayAfter(ascensionDay.date),
    upcoming: {
      period: 'same-season',
    },
  };
  const feastOfPentecost: EasterSeasonDay<'Feast of Pentecost'> = {
    name: 'Feast of Pentecost',
    season: 'Easter',
    type: 'Principal Feast',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    date: getDateOfPentecost(easter.date.year),
    upcoming: {
      period: 'same-season',
    },
  };

  const easterSeason: Period<SeasonOfEaster, SeasonOfEaster> = {
    name: 'Easter',
    season: 'Easter',
    type: 'Season',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    upcoming: false,
    isSeason: true,
    startDate: easter.date,
    endDate: feastOfPentecost.date,
  };

  return [
    easter,
    ascensionDay,
    ascensionSunday,
    feastOfPentecost,
    easterSeason,
  ];
}
