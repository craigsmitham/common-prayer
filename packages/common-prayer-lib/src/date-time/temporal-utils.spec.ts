import { expect, test } from 'vitest';
import {
  sundayAfter,
  sundayBefore,
} from 'common-prayer-lib/src/date-time/temporal-utils';
import { Temporal } from 'temporal-polyfill';

test('sundayBefore', () => {
  const monday = new Temporal.PlainDate(2024, 12, 2);
  const sundayBeforeMonday = new Temporal.PlainDate(2024, 12, 1);
  const sundayBeforeSunday = new Temporal.PlainDate(2024, 11, 24);

  expect(sundayBefore(monday).toString()).toEqual(
    sundayBeforeMonday.toString(),
  );

  expect(sundayBefore(sundayBeforeMonday).toString()).toStrictEqual(
    sundayBeforeSunday.toString(),
  );

  expect(sundayBefore(sundayBeforeMonday).toString()).not.toEqual(
    sundayBeforeMonday.toString(),
  );
});

test('plaindate equality', () => {
  const foo = new Temporal.PlainDate(2024, 12, 2);
  const bar = new Temporal.PlainDate(2024, 12, 2);

  expect(Temporal.PlainDate.compare(foo, bar)).toBe(0);
});

test('sundayAfter', () => {
  const monday = new Temporal.PlainDate(2024, 12, 2);
  const sundayAfterMonday = new Temporal.PlainDate(2024, 12, 8);
  const sundayAfterSunday = new Temporal.PlainDate(2024, 12, 15);

  console.log(monday.dayOfWeek);
  expect(sundayAfter(monday).toString()).toEqual(sundayAfterMonday.toString());

  expect(sundayAfter(sundayAfterMonday).toString()).toStrictEqual(
    sundayAfterSunday.toString(),
  );

  expect(sundayAfter(sundayAfterMonday).toString()).not.toEqual(
    sundayAfterMonday.toString(),
  );
});
