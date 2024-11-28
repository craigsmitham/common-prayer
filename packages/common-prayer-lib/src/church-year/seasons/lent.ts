import {
  Day,
  Event,
  Period,
} from 'common-prayer-lib/src/church-year/church-year';
import { getEasterDate } from 'common-prayer-lib/src/church-year/seasons/easter';
import { sundayBefore } from 'common-prayer-lib/src/date-time/temporal-utils';

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

export type LentEvent = Event<DaysOfLent, SeasonOfLent>;
export type LentDay<TDay extends DaysOfLent> = Day<TDay, SeasonOfLent>;

export function getAshWednesdayDate(isoYear: number) {
  return getFirstSundayOfLent(isoYear).subtract({ days: 4 });
}

export function getFirstSundayOfLent(isoYear: number) {
  const easterDate = getEasterDate(isoYear);
  return sundayBefore(easterDate).subtract({ weeks: 5 });
}

export function getLentEvents(easter: Day<'Easter Sunday'>): LentEvent[] {
  const ashWednesday: LentDay<'Ash Wednesday'> = {
    name: 'Ash Wednesday',
    season: 'Lent',
    type: 'x',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    date: getAshWednesdayDate(easter.date.year),
    upcoming: {
      period: 'next-season',
    },
  };

  const palmSunday: LentDay<'Palm Sunday'> = {
    name: 'Palm Sunday',
    season: 'Lent',
    type: 'Day of Special Devotion',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    date: easter.date.subtract({ weeks: 1 }),
    upcoming: {
      period: 'same-season',
    },
  };

  const maundyThursday: LentDay<'Maundy Thursday'> = {
    name: 'Maundy Thursday',
    season: 'Lent',
    type: 'x',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    date: easter.date.subtract({ days: 3 }),
    upcoming: {
      period: 'same-season',
    },
  };
  const goodFriday: LentDay<'Good Friday'> = {
    name: 'Good Friday',
    season: 'Lent',
    type: '',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    date: maundyThursday.date.add({ days: 1 }),
    upcoming: {
      period: 'same-season',
    },
  };
  const holySaturday: LentDay<'Holy Saturday'> = {
    name: 'Holy Saturday',
    season: 'Lent',
    type: 'x',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    date: goodFriday.date.add({ days: 1 }),
    upcoming: {
      period: 'same-season',
    },
  };
  const seasonOfLent: Period<SeasonOfLent> = {
    name: 'Lent',
    season: 'Lent',
    type: 'x',
    shortName: null,
    longName: null,
    traditionalName: null,
    alternativeNames: [],
    startDate: ashWednesday.date,
    endDate: holySaturday.date,
    isSeason: true,
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
