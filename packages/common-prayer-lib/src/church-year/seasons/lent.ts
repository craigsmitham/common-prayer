type DaysOfLent = 'Ash Wednesday' | HolyWeekDays;

type HolyWeekDays =
  | 'Palm Sunday'
  | 'Holy Monday'
  | 'Holy Tuesday'
  | 'Holy Wednesday'
  | 'Maundy Thursday'
  | 'Good Friday';

export function getLentEvents(easter: Day<'Easter Sunday'>): [] {
  return [];
}
