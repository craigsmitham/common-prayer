import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export default [
  ...prefix('dev', [route('design', 'routes/dev/Design.tsx')]),
  layout('./DefaultLayout.tsx', [
    index('routes/Home.tsx'),
    route('about', 'routes/About.tsx'),
    route(':isoYear', 'routes/calendar/YearPage.tsx'),
    route(':isoYear/:isoMonth', 'routes/calendar/MonthPage.tsx'),
    route(':isoYear/:isoMonth/:isoDay', 'routes/calendar/DayPage.tsx'),
  ]),
] satisfies RouteConfig;
