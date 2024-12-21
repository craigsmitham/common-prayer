import React from 'react';
import type { Season } from 'common-prayer-lib/src/church-year/church-year';

export const SeasonSpan: React.FC<{
  season: Season;
  children: React.ReactNode;
}> = ({ children }) => {
  return <div>{children}</div>;
};
