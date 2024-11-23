import ical, { ICalCalendarMethod, ICalDescription } from 'ical-generator';
import { getEasterDate } from 'common-prayer-lib/src/calendar/easter';
import { Temporal } from 'temporal-polyfill';

type Event = { name: string; description: string };

type Day = {
  date: Temporal.PlainDate;
} & Event;

export function getEasterDay(year: number): Day {
  const date = getEasterDate(year);
  return {
    name: 'Easter',
    description: `Easter day ${date.year}`,
    date,
  };
}

export function getChristmasDay({ easter }: { easter: Day }): Day {
  const date = new Temporal.PlainDate(easter.date.year - 1, 12, 25);
  return {
    name: 'Christmas',
    description: `Christmas day ${date.year}`,
    date,
  };
}

export function getChurchCalendarEvents(isoYear: number): Day[] {
  const easter = getEasterDay(isoYear);
  const christmas = getChristmasDay({ easter });
  return [christmas, easter];
}

export function createChurchCalendar() {
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
          plain: `${day.description}`,
          html: '${day.description}<hr />',
        },
        url: 'https://www.churchcalendar.app',
      });
    });
  return calendar;
}
