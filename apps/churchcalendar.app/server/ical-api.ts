import { type Request, Router } from 'express';
import { createChurchCalendar } from 'common-prayer-lib/src/church-year/ical';
import * as process from 'node:process';

function getHostUrl(req: Request) {
  const envPort = Number.parseInt(process.env.PORT ?? '3000');
  const port = envPort != null && envPort !== 80 ? `:` + envPort : '';
  return req.protocol + '://' + req.hostname + port;
}

function getPathUrl(req: Request) {
  return getHostUrl(req) + req.baseUrl + req.path;
}

export const icalApi = Router();
icalApi.get('/church-year.ics', (req, res) => {
  console.log({
    pathUrl: getPathUrl(req),
    hostUrl: getHostUrl(req),
  });

  const calendar = createChurchCalendar({
    calendarAppUrl: getHostUrl(req),
    calendarUrl: getPathUrl(req),
  });
  res.write(calendar.toString());
});
