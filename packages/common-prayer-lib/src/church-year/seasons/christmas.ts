import { Temporal } from 'temporal-polyfill';
import { Day, Event } from 'common-prayer-lib/src/church-year/church-year';

const daysOfChristmas = [
  '2nd Day of Christmas',
  '3rd Day of Christmas',
  '4th Day of Christmas',
  '5th Day of Christmas',
  '6th Day of Christmas',
  '7th Day of Christmas',
  '8th Day of Christmas',
  '9th Day of Christmas',
  '10th Day of Christmas',
  '11th Day of Christmas',
  '12th Day of Christmas',
] as const;

type DaysOfChristmas = (typeof daysOfChristmas)[number] | 'Christmas Day';

export function getChristmasEvents(christmas: Day<'Christmas Day'>): Event[] {
  return [
    christmas,
    ...daysOfChristmas.map((name, i) => {
      return {
        name,
        description: name,
        date: christmas.date.add(Temporal.Duration.from({ days: i + 1 })),
      };
    }),
    {
      name: 'Christmas',
      calendarSummary: 'Christmastide',
      startDate: christmas.date,
      endDate: christmas.date.add({ days: 12 }),
    },
  ];
}

export function getChristmasDay(
  easter: Day<'Easter Sunday'>,
): Day<'Christmas Day'> {
  const date = new Temporal.PlainDate(easter.date.year - 1, 12, 25);
  return {
    name: 'Christmas Day',
    description: `Christmas day ${date.year}`,
    date,
  };
}
