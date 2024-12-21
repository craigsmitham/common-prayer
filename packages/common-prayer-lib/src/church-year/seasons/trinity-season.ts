import {
  Day,
  Event,
  Season,
} from 'common-prayer-lib/src/church-year/church-year';
import { getFirstDateOfAdvent } from 'common-prayer-lib/src/church-year/seasons/advent';
import {
  EasterSeasonDay,
  getDateOfPentecost,
} from 'common-prayer-lib/src/church-year/seasons/easter';
import { sundayAfter } from 'common-prayer-lib/src/date-time/temporal-utils';

export type DaysOfTrinitySeason = 'Trinity Sunday';
export type TrinitySeason = 'Trinity Season';
type TrinitySeasonEvent = Event<DaysOfTrinitySeason, TrinitySeason>;
type TrinitySeasonDay<T extends DaysOfTrinitySeason> = Day<T, TrinitySeason>;

export function getTrinitySeasonEvents(
  easter: EasterSeasonDay<'Easter Sunday'>,
): TrinitySeasonEvent[] {
  const pentecost = getDateOfPentecost(easter.date.year);
  const trinitySunday: TrinitySeasonDay<'Trinity Sunday'> = {
    name: 'Trinity Sunday',
    season: 'Trinity Season',
    type: 'Principal Feast',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    date: sundayAfter(pentecost),
    upcoming: { period: 'same-season' },
  };

  const trinitySeason: Season<TrinitySeason> = {
    name: 'Trinity Season',
    slug: 'trinity-season',
    season: 'Trinity Season',
    type: 'Season',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    upcoming: {
      period: 'next-season',
    },
    isSeason: true,
    startDate: pentecost.add({ days: 1 }),
    endDate: getFirstDateOfAdvent(easter.date.year).subtract({ days: 1 }),
  };
  return [trinitySunday, trinitySeason];
}
