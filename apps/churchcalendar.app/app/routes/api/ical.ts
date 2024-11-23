import { createAPIFileRoute } from '@tanstack/start/api'
import { createChurchCalendar } from 'common-prayer-lib/src/calendar/ical'

export const Route = createAPIFileRoute('/api/ical')({
  GET: ({ request, params }) => {
    const calendar = createChurchCalendar()
    return new Response(calendar.toString())
  },
})
