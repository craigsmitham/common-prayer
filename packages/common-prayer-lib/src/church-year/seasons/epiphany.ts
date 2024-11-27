import { Temporal } from 'temporal-polyfill';
import {
  Day,
  Event,
  Period,
} from 'common-prayer-lib/src/church-year/church-year';
import { getEasterDate } from 'common-prayer-lib/src/church-year/seasons/easter';
import { getAshWednesdayDate } from 'common-prayer-lib/src/church-year/seasons/lent';
import { sundayBefore } from 'common-prayer-lib/src/date-time/temporal-utils';

export type DaysOfEpiphany =
  | 'Epiphany'
  | 'Transfiguration Sunday'
  | 'Shrove Tuesday';

export type SeasonOfEpiphany = 'Epiphany';

type EpiphanyEvent = Event<SeasonOfEpiphany, DaysOfEpiphany>;

export function getEpiphanyEvents(
  christmas: Day<'Christmas Day'>,
): EpiphanyEvent[] {
  const ashWednesday = getAshWednesdayDate(christmas.date.year + 1);
  const epiphany: Day<'Epiphany'> = {
    name: 'Epiphany',
    date: christmas.date.add(Temporal.Duration.from({ days: 12 })),
    upcoming: {
      period: 'next-season',
    },
  };
  const transfigurationSunday: Day<'Transfiguration Sunday'> = {
    date: sundayBefore(ashWednesday),
    name: 'Transfiguration Sunday',
    upcoming: {
      period: 'same-season',
    },
  };
  const shroveTuesday: Day<'Shrove Tuesday'> = {
    name: 'Shrove Tuesday',
    date: ashWednesday.subtract({ days: 1 }),
    upcoming: {
      period: 'same-season',
    },
  };
  const epiphanySeason: Period<SeasonOfEpiphany> = {
    name: 'Epiphany',
    startDate: epiphany.date,
    season: true,
    endDate: shroveTuesday.date,
    upcoming: false,
  };
  return [epiphany, transfigurationSunday, shroveTuesday, epiphanySeason];
}
