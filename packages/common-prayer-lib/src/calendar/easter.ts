import { Temporal } from 'temporal-polyfill'

const div = (dividend: number, divider: number): number =>
  Math.floor(dividend / divider)
export function getEasterDate(year: number): Temporal.PlainDate {
  const a = year % 19
  const b = div(year, 100)
  const c = year % 100
  const d = div(b, 4)
  const e = b % 4
  const f = div(b + 8, 25)
  const g = div(b - f + 1, 3)
  const h = (19 * a + b - d - g + 15) % 30
  const i = div(c, 4)
  const k = c % 4
  const ℓ = (32 + 2 * e + 2 * i - h - k) % 7
  const m = div(a + 11 * h + 22 * ℓ, 451)
  const month = div(h + ℓ - 7 * m + 114, 31)
  const day = ((h + ℓ - 7 * m + 114) % 31) + 1
  return new Temporal.PlainDate(year, month, day)
}
