import ical, { ICalCalendarMethod, ICalDescription } from 'ical-generator';
import { getEasterDate } from 'common-prayer-lib/src/calendar/easter';
import { Temporal } from 'temporal-polyfill';

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
type DaysOfChristmas = (typeof daysOfChristmas)[number];
type Days = 'Christmas' | DaysOfChristmas | 'Epiphany' | 'Easter';

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
  [currentYear - 1, currentYear, currentYear + 1, currentYear + 2]
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
