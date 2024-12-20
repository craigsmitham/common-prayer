import {
  index,
  prefix,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix(':isoYear', [
    route('', 'routes/y/YearByMonthsPage.tsx'),
    route('seasons', 'routes/y/YearBySeasonsPage.tsx'),
    route('seasons/:season', 'routes/y/SeasonOfYearPage.tsx'),
    route(':isoMonth', 'routes/y/MonthOfYearPage.tsx'),
    route(':isoMonth/:isoDay', 'routes/y/DayOfMonthPage.tsx'),
  ]),
] satisfies RouteConfig;
