import ical, { ICalCalendarMethod } from "ical-generator";
import { getEasterDate } from "common-prayer-lib/src/calendar/easter";
import { Temporal } from "temporal-polyfill";

const christmas = {
  name: "Christmas",
};

// A method is required for outlook to display event as an invitation

const startTime = new Date(Date.UTC(2024, 11, 25, 0, 0, 0));
const endTime = new Date(Date.UTC(2024, 11, 26, 0, 0, 0));

type Day = {
  name: string;
  date: Temporal.PlainDate;
};

export function getEasterDay(year: number): Day {
  return {
    name: "Easter",
    date: getEasterDate(year),
  };
}

export function getChristmasDay({ easter }: { easter: Day }): Day {
  return {
    name: "Christmas",
    date: new Temporal.PlainDate(easter.date.year - 1, 12, 25),
  };
}

export function getChurchCalendarEvents(isoYear: number): Day[] {
  const easter = getEasterDay(isoYear);
  const christmas = getChristmasDay({ easter });
  return [christmas, easter];
}

export function createChurchCalendar() {
  const calendar = ical({ name: "churchcalendar.app" });
  calendar.method(ICalCalendarMethod.REQUEST);
  const currentYear = new Date().getFullYear();
  [currentYear - 1, currentYear, currentYear + 1, currentYear + 2]
    .flatMap((year) => getChurchCalendarEvents(year))
    .forEach((day) => {
      calendar.createEvent({
        start: new Date(day.date.year, day.date.month - 1, day.date.day),
        allDay: true,
        summary: day.name,
        url: "https://www.churchcalendar.app",
      });
    });
  return calendar;
}
