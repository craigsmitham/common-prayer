import * as React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  CHURCH_YEAR_SEASONS,
  ChurchYearSeasons,
  EventType,
  getEventsForEasterIsoYear,
  isDay,
  isSeason,
  Period,
} from 'common-prayer-lib/src/church-year/church-year';
import {
  isSame,
  isWithin,
} from 'common-prayer-lib/src/date-time/temporal-utils';
import { Temporal } from 'temporal-polyfill';

export const Route = createFileRoute('/preview')({
  component: RouteComponent,
});

type PreviewEventType = Extract<EventType, 'Sunday' | 'Principal Feast'>;
type PreviewDayType = PreviewEventType | 'Unobserved' | 'Default';

function getDays(type: PreviewDayType): {
  season: Period<ChurchYearSeasons, ChurchYearSeasons>;
  date?: Temporal.PlainDate;
}[] {
  const events = getEventsForEasterIsoYear(2025);
  const seasons = events.filter(isSeason);
  const days = events.filter(isDay);

  return CHURCH_YEAR_SEASONS.map((seasonName) => {
    const season = seasons.find((s) => s.name === seasonName);
    if (season == null) {
      throw new Error(`unable to find ${seasonName} season`);
    }
    const daysInSeason = days.filter((d) => isWithin(d.date, season));
    if (type === 'Unobserved') {
      let date = season.startDate;
      while (isWithin(date, season)) {
        const observed = days.find((e) => isSame(date, e.date));
        if (observed == null) {
          return { season, date };
        }
        date = date.add({ days: 1 });
      }
      return { season };
    }
    if (type === 'Default') {
      return {
        season,
        date: daysInSeason.find((d) => {
          return true;
        })?.date,
      };
    }
    return {
      season,
      date: daysInSeason.find((d) => d.type === type)?.date,
    };
  });
}

function RouteComponent() {
  const previewType: PreviewDayType = 'Default';
  const dates = getDays(previewType);

  return (
    <div className="h-screen w-screen grid grid-cols-3 gap-4 bg-gray-100">
      {dates.map(({ season, date }, i) => {
        if (date == null) {
          return (
            <div key={i}>
              No {previewType} in the {season.name} season
            </div>
          );
        }

        const iframe = (
          <iframe
            className={'w-full h-full'}
            src={`/c/${date.year}/${date.month}/${date.day}`}
          ></iframe>
        );
        return <div key={i}>{iframe}</div>;
      })}
    </div>
  );
}
