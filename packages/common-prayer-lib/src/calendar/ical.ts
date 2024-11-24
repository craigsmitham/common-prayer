import ical, { ICalCalendarMethod, ICalDescription } from 'ical-generator';
import { getEasterDate } from 'common-prayer-lib/src/calendar/easter';
import { Temporal } from 'temporal-polyfill';
import {
  isWithin,
  sundayBefore,
  toDate,
} from 'common-prayer-lib/src/date-time/temporal-utils';

function getDay(day: Days, events: Event[]) {
  const d = events.find((e) => e.name === day);
  if (d == null) {
    throw new Error('Could not find event: ' + day);
  }
  return d;
}

function isDay(event: Event): event is Day {
  return 'date' in event && !isPeriod(event);
}

function isPeriod(event: Event): event is Period {
  return 'startDate' in event && 'endDate' in event && !isDay(event);
}
const daysOfChristmas = [
  '1st Day of Christmas',
  '2nd Day of Christmas',
  '3rd Day of Christmas',
  '4th Day of Christmas',
  '5th Day of Christmas',
  '6th Day of Christmas',
  '7th Day of Christmas',
  '8th Day of Christmas',
  '9th Day of Christmas',
  '10th Day of Christmas',
  '11th Day of Christmas',
  '12th Day of Christmas',
] as const;

type DaysOfAdvent =
  | '1st Sunday of Advent'
  | '2nd Sunday of Advent'
  | '3rd Sunday of Advent'
  | '4th Sunday of Advent'
  | 'Christmas Eve';

type Seasons =
  | 'Advent'
  | 'Christmas'
  | 'Epiphany'
  | 'Lent'
  | 'Holy Week'
  | 'Easter'
  | 'Pentecost'
  | 'Ordinary Time';

type Period<T extends Seasons = any> = {
  name: T;
  calendarSummary?: string;
  description?: string;
  startDate: Temporal.PlainDate;
  endDate: Temporal.PlainDate;
};

type DaysOfChristmas = (typeof daysOfChristmas)[number] | 'Christmas Day';
type DaysOfLent = 'Ash Wednesday' | HolyWeekDays;
type HolyWeekDays =
  | 'Palm Sunday'
  | 'Holy Monday'
  | 'Holy Tuesday'
  | 'Holy Wednesday'
  | 'Maundy Thursday'
  | 'Good Friday';
type DaysOfEpiphany = 'Epiphany' | 'Transfiguration Sunday';
type DaysOfEaster = 'Easter Sunday' | 'Ascension Sunday';
type Days =
  | DaysOfAdvent
  | DaysOfChristmas
  | DaysOfEpiphany
  | DaysOfLent
  | DaysOfEaster;

type Day<TDay extends Days = any> = {
  name: TDay;
  calendarSummary?: string;
  description?: string;
  date: Temporal.PlainDate;
};

type Event = Day<Days> | Period<Seasons>;

export function getEasterDay(isoYear: number): Day<'Easter Sunday'> {
  const date = getEasterDate(isoYear);
  return {
    name: 'Easter Sunday',
    description: `Easter day ${date.year}`,
    date,
  };
}

export function getChristmasEvents(christmas: Day<'Christmas Day'>): Event[] {
  return [
    christmas,
    ...daysOfChristmas.map((name, i) => {
      return {
        name,
        description: name,
        date: christmas.date.add(Temporal.Duration.from({ days: i })),
      };
    }),
    {
      name: 'Christmas',
      calendarSummary: 'Christmastide',
      startDate: christmas.date,
      endDate: christmas.date.add({ days: 12 }),
    },
  ];
}

export function getChristmasDay(
  easter: Day<'Easter Sunday'>,
): Day<'Christmas Day'> {
  const date = new Temporal.PlainDate(easter.date.year - 1, 12, 25);
  return {
    name: 'Christmas Day',
    description: `Christmas day ${date.year}`,
    date,
  };
}

export function getEpiphanyEvents(christmas: Day<'Christmas Day'>): Event[] {
  const epiphany: Day<'Epiphany'> = {
    name: 'Epiphany',
    date: christmas.date.add(Temporal.Duration.from({ days: 12 })),
  };
  return [epiphany];
}

export function getLentEvents(easter: Day<'Easter Sunday'>): [] {
  return [];
}

export function getAdventEvents(christmas: Day<'Christmas Day'>): Event[] {
  const firstDateOfAdvent = sundayBefore(christmas.date).subtract({ weeks: 3 });
  const christmasEve: Day<'Christmas Eve'> = {
    name: 'Christmas Eve',
    description: 'Christmas Eve',
    date: christmas.date.subtract({ days: 1 }),
  };
  const sundays: Day<DaysOfAdvent>[] = [
    {
      name: '1st Sunday of Advent',
      description: '1st Sunday of Advent',
      date: firstDateOfAdvent,
    },
    {
      name: '2nd Sunday of Advent',
      description: '2nd Sunday of Advent',
      date: firstDateOfAdvent.add({ weeks: 1 }),
    },
    {
      name: '3rd Sunday of Advent',
      description: '3rd Sunday of Advent',
      date: firstDateOfAdvent.add({ weeks: 2 }),
    },
    {
      name: '4th Sunday of Advent',
      description: '4th Sunday of Advent',
      date: firstDateOfAdvent.add({ weeks: 3 }),
    },
  ];
  const adventSeason: Period<'Advent'> = {
    name: 'Advent',
    calendarSummary: 'Advent Season',
    startDate: firstDateOfAdvent,
    endDate: christmasEve.date,
  };
  return [...sundays, christmasEve, adventSeason];
}

export function getChurchCalendarEvents(isoYear: number): Event[] {
  const easter = getEasterDay(isoYear);
  const christmas = getChristmasDay(easter);

  return [
    ...getAdventEvents(christmas),
    ...getChristmasEvents(christmas),
    ...getEpiphanyEvents(christmas),
    easter,
  ];
}

export function createChurchCalendar({
  calendarUrl,
  calendarAppUrl,
}: {
  calendarUrl: string;
  calendarAppUrl: string;
}) {
  const calendar = ical({ name: 'churchcalendar.app' });
  calendar.method(ICalCalendarMethod.REQUEST);
  const currentYear = new Date().getFullYear();
  const numberOfPastYears = 1;
  const numberOfYears = 4;
  const isoYears: number[] = new Array(numberOfYears)
    .fill(currentYear - numberOfPastYears)
    .map((startYear, i) => i + startYear);

  isoYears
    .flatMap((year) => getChurchCalendarEvents(year))
    .forEach((event) => {
      calendar.createEvent({
        start: toDate('date' in event ? event.date : event.startDate),
        end: 'endDate' in event ? toDate(event.endDate) : undefined,
        allDay: true,
        summary: event.calendarSummary ?? event.name,
        description: {
          plain: `${event.description}
--------------
${calendarAppUrl}`,
          html: `${event.description}<hr />
<a href="${calendarAppUrl}">${calendarAppUrl}</a>`,
        },
        url: 'https://www.churchcalendar.app',
      });
    });

  return calendar;
}

export function findDay(date: Temporal.PlainDate): Day | undefined {
  return [date.year, date.year + 1]
    .flatMap((year) => getChurchCalendarEvents(year))
    .filter(isDay)
    .find((e) => Temporal.PlainDate.compare(e.date, date) === 0);
}

export function findPeriod(date: Temporal.PlainDate): Period | undefined {
  return [date.year, date.year + 1]
    .flatMap((year) => getChurchCalendarEvents(year))
    .filter(isPeriod)
    .find((e) => {
      return isWithin(date, e);
    });
}
