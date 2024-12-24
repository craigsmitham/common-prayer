import { type Request, Router } from 'express';
import { createChurchCalendar } from 'common-prayer-lib/src/church-year/ical';
import * as process from 'node:process';

function getHostUrl(req: Request) {
  const envPort = Number.parseInt(process.env.PORT ?? '3000');
  const port = envPort != null && envPort !== 80 ? `:` + envPort : '';
  const vercelUrl = process.env.VERCEL_URL;
  return (
    req.protocol + '://' + (vercelUrl != null ? vercelUrl : req.hostname + port)
  );
}

function getPathUrl(req: Request) {
  return getHostUrl(req) + req.baseUrl + req.path;
}

export const icalApi = Router();
icalApi.get('/ChurchCalendar.app.ics', (req, res) => {
  const calendar = createChurchCalendar({
    calendarAppUrl: getHostUrl(req),
    calendarUrl: getPathUrl(req),
  });
  res.setHeader('Content-Type', 'text/calendar');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="church-year-calendar.ics"',
  );
  res.send(calendar.toString());
});
