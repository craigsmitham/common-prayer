import { Temporal } from 'temporal-polyfill';
import {
  DaysOfEaster,
  getEasterDay,
  getEasterEvents,
} from 'common-prayer-lib/src/church-year/seasons/easter';
import {
  isSame,
  isWithin,
} from 'common-prayer-lib/src/date-time/temporal-utils';
import {
  DaysOfChristmas,
  getChristmasDay,
  getChristmasEvents,
} from 'common-prayer-lib/src/church-year/seasons/christmas';
import { getAdventEvents } from 'common-prayer-lib/src/church-year/seasons/advent';
import { getEpiphanyEvents } from 'common-prayer-lib/src/church-year/seasons/epiphany';
import { getTrinitySeasonEvents } from 'common-prayer-lib/src/church-year/seasons/trinity-season';
import { getLentEvents } from 'common-prayer-lib/src/church-year/seasons/lent';

const previewPeriods = [
  'next-season',
  'same-season',
  'next-30-days',
  'next-7-days',
] as const;

export type PreviewPeriod = (typeof previewPeriods)[number];

type EventDefinition<TName extends string = string> = {
  name: TName;
  calendarSummary?: string;
  description?: string;
  upcoming:
    | {
        countdown?: boolean;
        period: PreviewPeriod;
      }
    | false;
};

export type Period = {
  startDate: Temporal.PlainDate;
  endDate: Temporal.PlainDate;
  season: boolean;
} & EventDefinition;

export function isDay(event: Event): event is Day {
  return 'date' in event && !isPeriod(event);
}

export function isPeriod(event: Event): event is Period {
  return 'startDate' in event && 'endDate' in event && !isDay(event);
}

export function isSeason(event: Event): event is Period {
  return isPeriod(event) && event.season;
}

/*
export type Seasons =
  | 'Advent'
  | 'Christmas'
  | 'Epiphany'
  | 'Lent'
  | 'Holy Week'
  | 'Easter'
  | 'Pentecost'
  | 'Ordinary Time';
 */

export type ChurchYearDays = DaysOfChristmas | DaysOfEaster;

export type Day<TDay extends string = string> = {
  date: Temporal.PlainDate;
} & EventDefinition<TDay>;

export type Event = Day | Period;

function _getEventsForEasterIsoYear(easterIsoYear: number): Event[] {
  const easter = getEasterDay(easterIsoYear);
  const christmas = getChristmasDay(easter);
  return [
    ...getAdventEvents(christmas),
    ...getChristmasEvents(christmas),
    ...getEpiphanyEvents(christmas),
    ...getLentEvents(easter),
    ...getEasterEvents(easter),
    ...getTrinitySeasonEvents(easter),
  ];
}
export function getEventsForEasterIsoYear(
  easterIsoYear: number,
  options: { previousYears?: number; additionalYears?: number } = {},
): Event[] {
  const yearCount =
    1 + (options?.previousYears ?? 0) + (options?.additionalYears ?? 0);
  const startYear = easterIsoYear - (options?.previousYears ?? 0);
  const years = new Array(yearCount).fill(0).map((_, i) => startYear + i);
  return years.flatMap((y) => _getEventsForEasterIsoYear(y));
}

function getCurrentAndNextYearEvents(date: Temporal.PlainDate) {
  return [date.year, date.year + 1].flatMap((year) =>
    getEventsForEasterIsoYear(year),
  );
}

export function findNextDay(date: Temporal.PlainDate): Day | undefined {
  return getCurrentAndNextYearEvents(date)
    .filter(isDay)
    .find((e) => Temporal.PlainDate.compare(e.date, date) === 0);
}

export function findNextPeriod(date: Temporal.PlainDate): Period | undefined {
  return getCurrentAndNextYearEvents(date)
    .filter(isPeriod)
    .find((e) => isWithin(date, e));
}

export function getUpcomingEvents(date: Temporal.PlainDate) {
  const allEvents = getCurrentAndNextYearEvents(date);
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
          return events.filter(({ upcomingDate }) =>
            isWithin(upcomingDate, currentSeason),
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
