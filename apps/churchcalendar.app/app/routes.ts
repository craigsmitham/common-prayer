import {
  index,
  prefix,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix(':year', [
    route('', 'routes/y/YearByMonthsPage.tsx'),
    route('seasons', 'routes/y/YearBySeasonsPage.tsx'),
    route('seasons/:season', 'routes/y/SeasonOfYearPage.tsx'),
    route(':month', 'routes/y/MonthOfYearPage.tsx'),
    route(':month/:day', 'routes/y/DayOfMonthPage.tsx'),
  ]),
] satisfies RouteConfig;
