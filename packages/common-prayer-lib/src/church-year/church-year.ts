import { Temporal } from 'temporal-polyfill';
import {
  DaysOfEaster,
  getEasterDay,
  getEasterEvents,
} from 'common-prayer-lib/src/church-year/seasons/easter';
import {
  isAfter,
  isSame,
  isWithin,
} from 'common-prayer-lib/src/date-time/temporal-utils';
import {
  DaysOfChristmas,
  getChristmasDay,
  getChristmasEvents,
} from 'common-prayer-lib/src/church-year/seasons/christmas';
import {
  DaysOfAdvent,
  getAdventEvents,
} from 'common-prayer-lib/src/church-year/seasons/advent';
import {
  DaysOfEpiphany,
  getEpiphanyEvents,
} from 'common-prayer-lib/src/church-year/seasons/epiphany';
import {
  DaysOfTrinitySeason,
  getTrinitySeasonEvents,
} from 'common-prayer-lib/src/church-year/seasons/trinity-season';
import {
  DaysOfLent,
  getLentEvents,
} from 'common-prayer-lib/src/church-year/seasons/lent';

const previewPeriods = [
  'next-season',
  'same-season',
  'next-30-days',
  'next-7-days',
] as const;

export type PreviewPeriod = (typeof previewPeriods)[number];

export type EventType =
  | 'Sunday'
  | 'Season'
  | 'Principal Feast'
  | 'Major Feast'
  | 'Minor Feast'
  | 'Day of Special Devotion'
  | 'Commemoration'
  | 'Fast Day'
  | 'Ember Day'
  | 'Rogation Day';

export function isDay(event: Event<any, any>): event is Day<any, any> {
  return 'date' in event && !isPeriod(event);
}

export function isPeriod(event: Event<any, any>): event is Period<any, any> {
  return 'startDate' in event && 'endDate' in event && !isDay(event);
}

export function isSeason(event: Event<any, any>): event is Season {
  return isPeriod(event) && event.isSeason;
}

export const CHURCH_YEAR_SEASONS = [
  'Advent',
  'Christmas',
  'Epiphany',
  'Lent',
  'Easter',
  'Trinity Season',
] as const;

export type ChurchYearSeasons = (typeof CHURCH_YEAR_SEASONS)[number];

export type ChurchYearDays =
  | DaysOfAdvent
  | DaysOfChristmas
  | DaysOfEpiphany
  | DaysOfLent
  | DaysOfEaster
  | DaysOfTrinitySeason;

type EventDefinition<
  TName extends string,
  TSeason extends ChurchYearSeasons,
> = {
  name: TName;
  season: TSeason;
  type?: EventType | 'x' | '';
  shortName: string | null;
  longName: string | null;
  traditionalName: string | null;
  alternativeNames: string[];
  calendarSummary?: string;
  description?: string;
  upcoming:
    | {
        countdown?: boolean;
        period: PreviewPeriod;
      }
    | false;
};

export type Event<TName extends string, TSeason extends ChurchYearSeasons> =
  | Day<TName, TSeason>
  | Period<TName | TSeason, TSeason>
  | Season<ChurchYearSeasons>;

export type Day<TName extends string, TSeason extends ChurchYearSeasons> = {
  date: Temporal.PlainDate;
} & EventDefinition<TName, TSeason>;

export type Season<TName extends ChurchYearSeasons = ChurchYearSeasons> =
  Period<TName, ChurchYearSeasons> & {
    isSeason: true;
    slug: string;
  };
export type Period<TName extends string, TSeason extends ChurchYearSeasons> = {
  startDate: Temporal.PlainDate;
  endDate: Temporal.PlainDate;
  isSeason: boolean;
} & EventDefinition<TName, TSeason>;

type ChurchYearEvent = Event<ChurchYearDays, ChurchYearSeasons>;

const memoizedEvents = new Map<number, ChurchYearEvent[] | 'calculating'>();

function _getEventsForEasterIsoYear(easterIsoYear: number): ChurchYearEvent[] {
  let events = memoizedEvents.get(easterIsoYear);
  if (events === 'calculating') {
    throw new Error('already calculating events for easter ISO year');
  }
  if (events != null) {
    return events;
  }
  memoizedEvents.set(easterIsoYear, 'calculating');
  const easter = getEasterDay(easterIsoYear);
  const christmas = getChristmasDay(easter);
  events = [
    ...getAdventEvents(christmas),
    ...getChristmasEvents(christmas),
    ...getEpiphanyEvents(christmas),
    ...getLentEvents(easter),
    ...getEasterEvents(easter),
    ...getTrinitySeasonEvents(easter),
  ];
  memoizedEvents.set(easterIsoYear, events);
  return events;
}

export function getEventsForIsoYear(isoYear: number) {
  return getEventsForEasterIsoYear(isoYear, { additionalYears: 1 }).filter(
    (e) =>
      (isDay(e) && e.date.year === isoYear) ||
      (isPeriod(e) &&
        (e.startDate.year === isoYear || e.endDate.year === isoYear)),
  );
}

export function getEventsForEasterIsoYear(
  easterIsoYear: number,
  options: { previousYears?: number; additionalYears?: number } = {},
): ChurchYearEvent[] {
  const yearCount =
    1 + (options?.previousYears ?? 0) + (options?.additionalYears ?? 0);
  const startYear = easterIsoYear - (options?.previousYears ?? 0);
  const years = new Array(yearCount).fill(0).map((_, i) => startYear + i);
  return years.flatMap((y) => _getEventsForEasterIsoYear(y));
}

export function findNextDay(
  date: Temporal.PlainDate,
): Day<any, any> | undefined {
  return getEventsForEasterIsoYear(date.year, { additionalYears: 1 })
    .filter(isDay)
    .find((e) => Temporal.PlainDate.compare(e.date, date) === 0);
}

export function findNextPeriod(
  date: Temporal.PlainDate,
): Period<any, any> | undefined {
  return getEventsForEasterIsoYear(date.year)
    .filter(isPeriod)
    .find((e) => isWithin(date, e));
}

export function getUpcomingEvents(date: Temporal.PlainDate) {
  const allEvents = getEventsForEasterIsoYear(date.year, {
    additionalYears: 1,
  });
  const previewedEvents = previewPeriods
    .flatMap((period) => {
      const events = allEvents
        .filter((e) => e.upcoming !== false && e.upcoming.period == period)
        .map((e) => ({
          event: e,
          upcomingDate: isDay(e) ? e.date : e.startDate,
        }))
        .filter(({ upcomingDate }) => !isSame(upcomingDate, date));
      switch (period) {
        case 'next-30-days':
          return events.filter(({ upcomingDate }) =>
            isWithin(date, {
              startDate: upcomingDate.subtract({ days: 31 }),
              endDate: upcomingDate.subtract({ days: 1 }),
            }),
          );
        case 'next-7-days':
          return events.filter(({ upcomingDate }) =>
            isWithin(upcomingDate, {
              startDate: date.subtract({ days: 8 }),
              endDate: date.subtract({ days: 1 }),
            }),
          );
        case 'next-season': {
          const currentSeason = allEvents.find(
            (e) => isSeason(e) && isWithin(date, e),
          );
          if (currentSeason == null || !isSeason(currentSeason)) {
            throw new Error('could not find current season');
          }
          const nextSeason = allEvents.find(
            (e) =>
              isSeason(e) &&
              isSame(e.startDate, currentSeason.endDate.add({ days: 1 })),
          );
          if (nextSeason == null || !isSeason(nextSeason)) {
            throw new Error('Could not find next season');
          }
          return events.filter(({ upcomingDate }) =>
            isWithin(upcomingDate, nextSeason),
          );
        }
        case 'same-season': {
          const currentSeason = allEvents.find(
            (e) => isSeason(e) && isWithin(date, e),
          );
          if (currentSeason == null || !isSeason(currentSeason)) {
            throw new Error('could not find current season');
          }
          return events.filter(
            ({ upcomingDate }) =>
              isWithin(upcomingDate, currentSeason) &&
              isAfter(upcomingDate, date),
          );
        }
        default:
          throw new Error(`Unsupported preview period: ${period}`);
      }
    })
    .sort((a, b) => {
      const dateCompare = Temporal.PlainDate.compare(
        a.upcomingDate,
        b.upcomingDate,
      );
      if (dateCompare !== 0) {
        return dateCompare;
      }
      if (isSeason(a.event) && isDay(b.event)) {
        return -1;
      }
      return 0;
    });
  return previewedEvents;
}
export function getObservedDays(date: Temporal.PlainDate): Day<any, any>[] {
  return getEventsForIsoYear(date.year)
    .filter(isDay)
    .filter((d) => isSame(d.date, date));
}

export function getSeasonForDate(date: Temporal.PlainDate): Season {
  const seasons = getEventsForIsoYear(date.year).filter(isSeason);
  const season = seasons.find((s) => isWithin(date, s));
  if (season == null) {
    throw new Error(`Could not find season for date ${date.toString()}`);
  }
  return season;
}

export function getMonthsInSeason(season: Season): Temporal.PlainYearMonth[] {
  const startMonth = season.startDate.toPlainYearMonth();
  const endMonth = season.endDate.toPlainYearMonth();
  const months: Temporal.PlainYearMonth[] = [];
  let month = startMonth;
  while (Temporal.PlainYearMonth.compare(month, endMonth) <= 0) {
    months.push(month);
    month = month.add({ months: 1 });
  }
  return months;
}
