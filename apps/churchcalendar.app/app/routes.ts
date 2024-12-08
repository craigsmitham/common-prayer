import {
  index,
  prefix,
  route,
  type RouteConfig,
} from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  ...prefix('c', [
    route(':year/:month/:day', 'routes/c/{year}.{month}.{day}.tsx'),
    route(':year/:month', 'routes/c/{year}.{month}.tsx'),
    route(':year', 'routes/c/{year}.tsx'),
  ]),
  ...prefix('feeds', [
    route('church-year.ics', 'routes/feeds/church-year.ics.ts'),
  ]),
] satisfies RouteConfig;
