import ical, { ICalCalendarMethod } from 'ical-generator';
import { toDate } from 'common-prayer-lib/src/date-time/temporal-utils';
import {
  getEventsForEasterIsoYear,
  isDay,
} from 'common-prayer-lib/src/church-year/church-year';

export function createChurchCalendar({
  calendarUrl,
  calendarAppUrl,
}: {
  calendarUrl: string;
  calendarAppUrl: string;
}) {
  const calendar = ical({ name: 'churchcalendar.app', url: calendarUrl });
  calendar.method(ICalCalendarMethod.REQUEST);

  const events = getEventsForEasterIsoYear(new Date().getFullYear(), {
    previousYears: 1,
    additionalYears: 3,
  });

  events.filter(isDay).forEach((day) => {
    calendar.createEvent({
      start: toDate(day.date),
      allDay: true,
      summary: day.calendarSummary ?? day.name,
      description: {
        plain: `${day.description}
--------------
View day for ${day.date.toString()}: ${calendarAppUrl}/${day.date.year}/${day.date.month}/${day.date.day}
View today's date: ${calendarAppUrl}
`,
        html: `${day.description}<hr />
        Today:<a href="${calendarAppUrl}">${calendarAppUrl}</a>`,
      },
      // url: 'https://www.churchcalendar.app',
    });
  });

  return calendar;
}
