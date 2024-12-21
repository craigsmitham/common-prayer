import {
  index,
  prefix,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix(':isoYear', [
    route('', 'routes/calendar/YearByMonthsPage.tsx'),
    route('seasons', 'routes/calendar/YearBySeasonsPage.tsx'),
    route('seasons/:season', 'routes/calendar/SeasonOfYearPage.tsx'),
    route(':isoMonth', 'routes/calendar/MonthOfYearPage.tsx'),
    route(':isoMonth/:isoDay', 'routes/calendar/DayOfMonthPage.tsx'),
  ]),
] satisfies RouteConfig;
