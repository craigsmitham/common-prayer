import { createAPIFileRoute } from '@tanstack/start/api';
import { createChurchCalendar } from 'common-prayer-lib/src/calendar/ical';

type CalendarClients = 'google' | 'outlook' | 'outlook-for-web' | 'apple-ios';

export const Route = createAPIFileRoute('/api/ical')({
  GET: ({ request, params }) => {
    const rootUrl = new URL(request.url).origin;

    const calendar = createChurchCalendar({
      calendarAppUrl: rootUrl,
      calendarUrl: rootUrl + '/api/ical',
    });
    return new Response(calendar.toString());
  },
});
