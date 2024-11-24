/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root';
import { Route as IndexImport } from './routes/index';
import { Route as CYearMonthDayImport } from './routes/c/$year.$month.$day';

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const CYearMonthDayRoute = CYearMonthDayImport.update({
  id: '/c/$year/$month/$day',
  path: '/c/$year/$month/$day',
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/c/$year/$month/$day': {
      id: '/c/$year/$month/$day';
      path: '/c/$year/$month/$day';
      fullPath: '/c/$year/$month/$day';
      preLoaderRoute: typeof CYearMonthDayImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute;
  '/c/$year/$month/$day': typeof CYearMonthDayRoute;
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute;
  '/c/$year/$month/$day': typeof CYearMonthDayRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof IndexRoute;
  '/c/$year/$month/$day': typeof CYearMonthDayRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: '/' | '/c/$year/$month/$day';
  fileRoutesByTo: FileRoutesByTo;
  to: '/' | '/c/$year/$month/$day';
  id: '__root__' | '/' | '/c/$year/$month/$day';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  CYearMonthDayRoute: typeof CYearMonthDayRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CYearMonthDayRoute: CYearMonthDayRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/c/$year/$month/$day"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/c/$year/$month/$day": {
      "filePath": "c/$year.$month.$day.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
