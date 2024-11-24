import { expect, test } from 'vitest';
import { sundayBefore } from 'common-prayer-lib/src/date-time/temporal-utils';
import { Temporal } from 'temporal-polyfill';

test('sundaysBefore', () => {
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
