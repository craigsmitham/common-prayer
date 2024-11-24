import ical, { ICalCalendarMethod, ICalDescription } from 'ical-generator';
import { getEasterDate } from 'common-prayer-lib/src/calendar/easter';
import { Temporal } from 'temporal-polyfill';
import { sundayBefore } from 'common-prayer-lib/src/date-time/temporal-utils';

type Event = { name: string; description: string };

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

type SundaysOfAdvent =
  | '1st Sunday of Advent'
  | '2nd Sunday of Advent'
  | '3rd Sunday of Advent'
  | '4th Sunday of Advent';

type DaysOfChristmas = (typeof daysOfChristmas)[number];
type Days =
  | SundaysOfAdvent
  | 'Christmas Eve'
  | 'Christmas'
  | DaysOfChristmas
  | 'Epiphany'
  | 'Easter';

type Day<TDay extends Days> = {
  name: TDay;
  date: Temporal.PlainDate;
} & Event;

export function getEasterDay(isoYear: number): Day<'Easter'> {
  const date = getEasterDate(isoYear);
  return {
    name: 'Easter',
    description: `Easter day ${date.year}`,
    date,
  };
}

export function getSundaysOfAdvent(
  christmas: Day<'Christmas'>,
): Day<SundaysOfAdvent>[] {
  const firstDateOfAdvent = sundayBefore(christmas.date).subtract({ weeks: 3 });
  return [
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
}

export function getDayOfChristmas(
  christmas: Day<'Christmas'>,
): Day<DaysOfChristmas>[] {
  return daysOfChristmas.map((name, i) => {
    return {
      name,
      description: name,
      date: christmas.date.add(Temporal.Duration.from({ days: i })),
    };
  });
}

export function getChristmasDay(easter: Day<'Easter'>): Day<'Christmas'> {
  const date = new Temporal.PlainDate(easter.date.year - 1, 12, 25);
  return {
    name: 'Christmas',
    description: `Christmas day ${date.year}`,
    date,
  };
}
export function getChristmasEve(
  christmas: Day<'Christmas'>,
): Day<'Christmas Eve'> {
  return {
    name: 'Christmas Eve',
    description: 'Christmas Eve',
    date: christmas.date.subtract({ days: 1 }),
  };
}

export function getEpiphanyDay(christmas: Day<'Christmas'>): Day<'Epiphany'> {
  const date = christmas.date.add(Temporal.Duration.from({ days: 12 }));
  return {
    name: 'Epiphany',
    description: `Epiphany`,
    date,
  };
}

export function getChurchCalendarEvents(isoYear: number): Day<Days>[] {
  const easter = getEasterDay(isoYear);
  const christmas = getChristmasDay(easter);

  return [
    ...getSundaysOfAdvent(christmas),
    getChristmasEve(christmas),
    christmas,
    ...getDayOfChristmas(christmas),
    getEpiphanyDay(christmas),
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
  new Array(numberOfYears)
    .map((_, i) => currentYear - numberOfPastYears + i)
    .flatMap((year) => getChurchCalendarEvents(year))
    .forEach((day) => {
      calendar.createEvent({
        start: new Date(day.date.year, day.date.month - 1, day.date.day),
        allDay: true,
        summary: day.name,
        description: {
          plain: `${day.description}
--------------
${calendarAppUrl}`,
          html: `${day.description}<hr />
<a href="${calendarAppUrl}">${calendarAppUrl}</a>`,
        },
        url: 'https://www.churchcalendar.app',
      });
    });
  return calendar;
}
