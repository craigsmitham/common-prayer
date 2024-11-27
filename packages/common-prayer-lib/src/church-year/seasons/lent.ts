import {
  Day,
  Event,
  Period,
} from 'common-prayer-lib/src/church-year/church-year';
import { getEasterDate } from 'common-prayer-lib/src/church-year/seasons/easter';
import { sundayBefore } from 'common-prayer-lib/src/date-time/temporal-utils';
import { DaysOfTrinitySeason } from 'common-prayer-lib/src/church-year/seasons/trinity-season';

export type DaysOfLent = 'Ash Wednesday' | HolyWeekDays;
export type SeasonOfLent = 'Lent';

type HolyWeekDays =
  | 'Palm Sunday'
  | 'Holy Monday'
  | 'Holy Tuesday'
  | 'Holy Wednesday'
  | 'Maundy Thursday'
  | 'Good Friday'
  | 'Holy Saturday';

type LentEvent = Event<SeasonOfLent, DaysOfLent>;

export function getAshWednesdayDate(isoYear: number) {
  return getFirstSundayOfLent(isoYear).subtract({ days: 4 });
}

export function getFirstSundayOfLent(isoYear: number) {
  const easterDate = getEasterDate(isoYear);
  return sundayBefore(easterDate).subtract({ weeks: 5 });
}

export function getLentEvents(easter: Day<'Easter Sunday'>): LentEvent[] {
  const ashWednesday: Day<'Ash Wednesday'> = {
    name: 'Ash Wednesday',
    date: getAshWednesdayDate(easter.date.year),
    upcoming: {
      period: 'next-season',
    },
  };

  const palmSunday: Day<'Palm Sunday'> = {
    name: 'Palm Sunday',
    date: easter.date.subtract({ weeks: 1 }),
    upcoming: {
      period: 'same-season',
    },
  };

  const maundyThursday: Day<'Maundy Thursday'> = {
    name: 'Maundy Thursday',
    date: easter.date.subtract({ days: 3 }),
    upcoming: {
      period: 'same-season',
    },
  };
  const goodFriday: Day<'Good Friday'> = {
    name: 'Good Friday',
    date: maundyThursday.date.add({ days: 1 }),
    upcoming: {
      period: 'same-season',
    },
  };
  const holySaturday: Day<'Holy Saturday'> = {
    name: 'Holy Saturday',
    date: goodFriday.date.add({ days: 1 }),
    upcoming: {
      period: 'same-season',
    },
  };
  const seasonOfLent: Period<SeasonOfLent> = {
    name: 'Lent',
    startDate: ashWednesday.date,
    endDate: holySaturday.date,
    season: true,
    upcoming: {
      period: 'next-season',
    },
  };

  return [
    ashWednesday,
    palmSunday,
    maundyThursday,
    goodFriday,
    holySaturday,
    seasonOfLent,
  ];
}
