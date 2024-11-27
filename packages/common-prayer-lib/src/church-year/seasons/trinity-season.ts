import {
  Event,
  Day,
  Period,
} from 'common-prayer-lib/src/church-year/church-year';
import { getFirstDateOfAdvent } from 'common-prayer-lib/src/church-year/seasons/advent';
import { getDateOfPentecost } from 'common-prayer-lib/src/church-year/seasons/easter';
import { sundayAfter } from 'common-prayer-lib/src/date-time/temporal-utils';

export type DaysOfTrinitySeason = 'Trinity Sunday';
export type TrinitySeason = 'Trinity Season';
type TrinitySeasonEvent = Event<TrinitySeason, DaysOfTrinitySeason>;

export function getTrinitySeasonEvents(
  easter: Day<'Easter Sunday'>,
): TrinitySeasonEvent[] {
  const pentecost = getDateOfPentecost(easter.date.year);
  const trinitySunday: Day<'Trinity Sunday'> = {
    name: 'Trinity Sunday',
    date: sundayAfter(pentecost),
    upcoming: { period: 'next-7-days' },
  };
  const trinitySeason: Period<TrinitySeason> = {
    name: 'Trinity Season',
    upcoming: false,
    season: true,
    startDate: pentecost.add({ days: 1 }),
    endDate: getFirstDateOfAdvent(easter.date.year).subtract({ days: 1 }),
  };
  return [trinitySunday, trinitySeason];
}
