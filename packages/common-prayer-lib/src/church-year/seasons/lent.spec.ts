import { describe, expect, test } from 'vitest';
import {
  getAshWednesdayDate,
  getFirstSundayOfLent,
} from 'common-prayer-lib/src/church-year/seasons/lent';

describe('Lent', () => {
  test('1st Sunday of Lent', () => {
    expect(getFirstSundayOfLent(2025).toString()).toBe('2025-03-09');
  });

  test('Ash Wednesday', () => {
    expect(getAshWednesdayDate(2025).toString()).toBe('2025-03-05');
  });
});
