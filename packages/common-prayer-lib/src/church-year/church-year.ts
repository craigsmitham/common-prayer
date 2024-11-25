import { Temporal } from 'temporal-polyfill';
import {
  DaysOfEaster,
  getEasterDay,
  getEasterEvents,
} from 'common-prayer-lib/src/church-year/seasons/easter';
import { isWithin } from 'common-prayer-lib/src/date-time/temporal-utils';
import {
  getChristmasDay,
  getChristmasEvents,
} from 'common-prayer-lib/src/church-year/seasons/christmas';
import { getAdventEvents } from 'common-prayer-lib/src/church-year/seasons/advent';
import { getEpiphanyEvents } from 'common-prayer-lib/src/church-year/seasons/epiphany';

type EventDefinition<TName = string> = {
  name: TName;
  calendarSummary?: string;
  description?: string;
};

export type Period = {
  startDate: Temporal.PlainDate;
  endDate: Temporal.PlainDate;
} & EventDefinition;

export function isDay(event: Event): event is Day {
  return 'date' in event && !isPeriod(event);
}

export function isPeriod(event: Event): event is Period {
  return 'startDate' in event && 'endDate' in event && !isDay(event);
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

export type Day<TDay = any> = {
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
    ...getEasterEvents(easter),
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

export function findNextDay(date: Temporal.PlainDate): Day | undefined {
  return [date.year, date.year + 1]
    .flatMap((year) => getEventsForEasterIsoYear(year))
    .filter(isDay)
    .find((e) => Temporal.PlainDate.compare(e.date, date) === 0);
}

export function findNextPeriod(date: Temporal.PlainDate): Period | undefined {
  return [date.year, date.year + 1]
    .flatMap((year) => getEventsForEasterIsoYear(year))
    .filter(isPeriod)
    .find((e) => isWithin(date, e));
}
