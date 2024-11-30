import { describe, expect } from 'vitest';
import {
  ChurchYearDays,
  ChurchYearSeasons,
  Day,
  getEventsForEasterIsoYear,
  isDay,
  isSeason,
  Period,
} from 'common-prayer-lib/src/church-year/church-year';
import { DaysOfAdvent } from 'common-prayer-lib/src/church-year/seasons/advent';
import { DaysOfChristmas } from 'common-prayer-lib/src/church-year/seasons/christmas';
import { DaysOfEpiphany } from 'common-prayer-lib/src/church-year/seasons/epiphany';
import { isWithin } from 'common-prayer-lib/src/date-time/temporal-utils';
import { DaysOfLent } from 'common-prayer-lib/src/church-year/seasons/lent';
import { DaysOfEaster } from 'common-prayer-lib/src/church-year/seasons/easter';
import {
  DaysOfTrinitySeason,
  TrinitySeason,
} from 'common-prayer-lib/src/church-year/seasons/trinity-season';

type DayExpectations<TDays extends ChurchYearDays> = [
  expectedDate: string,
  day: TDays,
];

describe('Church Year', () => {
  const events = getEventsForEasterIsoYear(2025);

  function testSeason<
    TSeason extends ChurchYearSeasons,
    TDays extends ChurchYearDays,
  >({
    start,
    end,
    season,
    days,
  }: {
    start: string;
    end: string;
    season: TSeason;
    days: DayExpectations<TDays>[];
  }) {
    const s = events.find((s) => isSeason(s) && s.name === season) as Period<
      any,
      any
    >;
    expect(s, season).not.toBeUndefined();
    expect(s?.startDate.toString(), `season start`).toBe(start);
    expect(s?.endDate.toString(), 'season end').toBe(end);

    const daysInSeason = events
      .filter(isDay)
      .filter((d) => isWithin(d.date, s!));

    daysInSeason.forEach((d) => {
      const daySpec = days.find(([, day]) => d.name === day);
      expect(
        daySpec,
        'missing date assertion for ' + d.name,
      ).not.toBeUndefined();
    });

    days.forEach(([expectedDate, day]) => {
      const d = events.find((e) => isDay(e) && e.name === day) as Day<any, any>;
      expect(d, `Cannot find day '${day}'`).not.toBeUndefined();
      expect(d?.date.toString(), day).toBe(expectedDate);
    });
  }

  describe('Advent', () => {
    testSeason<'Advent', DaysOfAdvent>({
      season: 'Advent',
      start: '2024-12-01',
      end: '2024-12-24',
      days: [
        ['2024-12-01', '1st Sunday of Advent'],
        ['2024-12-08', '2nd Sunday of Advent'],
        ['2024-12-15', '3rd Sunday of Advent'],
        ['2024-12-22', '4th Sunday of Advent'],
        ['2024-12-24', 'Christmas Eve'],
      ],
    });
  });

  describe('Christmas', () => {
    testSeason<'Christmas', DaysOfChristmas>({
      season: 'Christmas',
      start: '2024-12-25',
      end: '2025-01-05',
      days: [
        ['2024-12-25', 'Christmas Day'],
        ['2024-12-26', '2nd Day of Christmas'],
        ['2024-12-27', '3rd Day of Christmas'],
        ['2024-12-28', '4th Day of Christmas'],
        ['2024-12-29', '5th Day of Christmas'],
        ['2024-12-30', '6th Day of Christmas'],
        ['2024-12-31', '7th Day of Christmas'],
        ['2025-01-01', '8th Day of Christmas'],
        ['2025-01-02', '9th Day of Christmas'],
        ['2025-01-03', '10th Day of Christmas'],
        ['2025-01-04', '11th Day of Christmas'],
        ['2025-01-05', '12th Day of Christmas'],
      ],
    });
  });

  describe('Epiphany', () => {
    testSeason<'Epiphany', DaysOfEpiphany>({
      season: 'Epiphany',
      start: '2025-01-06',
      end: '2025-03-04',
      days: [
        ['2025-01-06', 'Epiphany'],
        ['2025-03-02', 'Transfiguration Sunday'],
        ['2025-03-04', 'Shrove Tuesday'],
      ],
    });
  });

  describe('Lent', () => {
    testSeason<'Lent', DaysOfLent>({
      season: 'Lent',
      start: '2025-03-05',
      end: '2025-04-19',
      days: [
        ['2025-03-05', 'Ash Wednesday'],
        ['2025-04-13', 'Palm Sunday'],
        ['2025-04-17', 'Maundy Thursday'],
        ['2025-04-18', 'Good Friday'],
        ['2025-04-19', 'Holy Saturday'],
      ],
    });
  });

  describe('Easter', () => {
    testSeason<'Easter', DaysOfEaster>({
      season: 'Easter',
      start: '2025-04-20',
      end: '2025-06-08',

      days: [
        ['2025-04-20', 'Easter Sunday'],
        ['2025-05-29', 'Ascension Day'],
        ['2025-06-01', 'Sunday after Ascension Day'],
        ['2025-06-08', 'Feast of Pentecost'],
      ],
    });
  });

  describe('Trinity Season', () => {
    testSeason<TrinitySeason, DaysOfTrinitySeason>({
      season: 'Trinity Season',
      start: '2025-06-09',
      end: '2025-11-29',
      days: [['2025-06-15', 'Trinity Sunday']],
    });
  });

  describe('observed days', () => {
    // TODO: there may be only a single observed day for any day in the year
    // On sundays, only principal feasts and those specified here are observed over any "Sunday":
    // https://www.episcopalchurch.org/glossary/precedence-rules-of/
  });

  describe('Event types', () => {
    describe('Principal Feasts', () => {
      // https://www.episcopalchurch.org/glossary/precedence-rules-of/
      const expectedPrincipalFeasts: ChurchYearDays[] = [
        'Easter Sunday',
        'Ascension Day',
        'Feast of Pentecost',
        'Trinity Sunday',
        // TODO All Saints' Day
        'Christmas Day',
        'Epiphany',
      ];
      const principalFeasts = events.filter(
        (e) => e.type === 'Principal Feast',
      );
      expectedPrincipalFeasts.forEach((name) => {
        const f = principalFeasts.find((f) => f.name === name);
        expect(f, `${name} is a principal feast`).not.toBeUndefined();
      });
      expect(principalFeasts.length).toBe(expectedPrincipalFeasts.length);
    });
    describe('Sundays', () => {
      events
        .filter((e) => e.type === 'Sunday')
        .forEach((e) => {
          expect(
            isDay(e) && e.date.dayOfWeek === 7,
            `${e.name} is on a Sunday`,
          ).toBe(true);
        });
    });
  });
});
