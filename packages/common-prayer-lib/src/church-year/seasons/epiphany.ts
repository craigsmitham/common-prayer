import { Temporal } from 'temporal-polyfill';
import {
  Day,
  Event,
  Season,
} from 'common-prayer-lib/src/church-year/church-year';
import { getAshWednesdayDate } from 'common-prayer-lib/src/church-year/seasons/lent';
import { sundayBefore } from 'common-prayer-lib/src/date-time/temporal-utils';
import { ChristmasSeasonDay } from 'common-prayer-lib/src/church-year/seasons/christmas';

export type DaysOfEpiphany =
  | 'Epiphany'
  | 'Transfiguration Sunday'
  | 'Shrove Tuesday';

export type SeasonOfEpiphany = 'Epiphany';

export type EpiphanySeasonEvent = Event<DaysOfEpiphany, SeasonOfEpiphany>;
export type EpiphanySeasonDay<TDay extends DaysOfEpiphany> = Day<
  TDay,
  SeasonOfEpiphany
>;

export function getEpiphanyEvents(
  christmas: ChristmasSeasonDay<'Christmas Day'>,
): EpiphanySeasonEvent[] {
  const ashWednesday = getAshWednesdayDate(christmas.date.year + 1);
  const epiphany: EpiphanySeasonDay<'Epiphany'> = {
    monthName: 'Epiphany',
    season: 'Epiphany',
    type: 'Principal Feast',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    date: christmas.date.add(Temporal.Duration.from({ days: 12 })),
    upcoming: {
      period: 'next-season',
    },
  };
  const transfigurationSunday: EpiphanySeasonDay<'Transfiguration Sunday'> = {
    monthName: 'Transfiguration Sunday',
    season: 'Epiphany',
    type: 'x',
    date: sundayBefore(ashWednesday),
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    upcoming: {
      period: 'same-season',
    },
  };
  const shroveTuesday: EpiphanySeasonDay<'Shrove Tuesday'> = {
    monthName: 'Shrove Tuesday',
    season: 'Epiphany',
    type: 'x',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    date: ashWednesday.subtract({ days: 1 }),
    upcoming: {
      period: 'same-season',
    },
  };
  const epiphanySeason: Season<SeasonOfEpiphany> = {
    monthName: 'Epiphany',
    slug: 'epiphany-season',
    season: 'Epiphany',
    type: 'x',
    shortName: null,
    longName: 'Season of Epiphany',
    traditionalName: null,
    alternativeNames: [],
    startDate: epiphany.date,
    isSeason: true,
    endDate: shroveTuesday.date,
    upcoming: false,
  };
  return [epiphany, transfigurationSunday, shroveTuesday, epiphanySeason];
}
