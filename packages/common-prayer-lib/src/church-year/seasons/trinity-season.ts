import {
  Event,
  Day,
  Period,
} from 'common-prayer-lib/src/church-year/church-year';
import { getFirstDateOfAdvent } from 'common-prayer-lib/src/church-year/seasons/advent';
import { getDateOfPentecost } from 'common-prayer-lib/src/church-year/seasons/easter';

export function getTrinitySeasonEvents(easter: Day<'Easter Sunday'>): Event[] {
  const trinitySunday: Day<'Trinity Sunday'> = {
    name: 'Trinity Sunday',
    date: easter.date.add({ weeks: 7 }),
    upcoming: { period: 'next-7-days' },
  };
  const trinitySeason: Period = {
    name: 'Trinity Season',
    upcoming: false,
    season: true,
    startDate: getDateOfPentecost(easter.date.year).add({ days: 1 }),
    endDate: getFirstDateOfAdvent(easter.date.year).subtract({ days: 1 }),
  };
  return [trinitySunday, trinitySeason];
}
