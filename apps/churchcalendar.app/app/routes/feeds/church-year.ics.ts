import type { Route } from './+types/church-year.ics';
import { createChurchCalendar } from 'common-prayer-lib/src/church-year/ical';

export async function loader({ request }: Route.LoaderArgs) {
  const rootUrl = new URL(request.url).origin;
  const calendar = createChurchCalendar({
    calendarAppUrl: rootUrl,
    calendarUrl: rootUrl + '/a/ical',
  });
  return new Response(calendar.toString());
}
