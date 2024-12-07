import {
  index,
  prefix,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix('c', [
    route(':year', 'routes/c/{year}.tsx'),
    route(':year/:month', 'routes/c/{year}.{month}.tsx'),
    route(':year/:month/:day', 'routes/c/{year}.{month}.{day}.tsx'),
  ]),
  ...prefix('feeds', [
    route('church-year.ics', 'routes/feeds/church-year.ics.ts'),
  ]),
] satisfies RouteConfig;
