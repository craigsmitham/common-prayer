type MonthNameOptions = {
  format?: 'long' | 'short';
  locale?: Intl.LocalesArgument;
};
export function getMonthName(
  month: number,
  options?: MonthNameOptions,
): string {
  return new Intl.DateTimeFormat(options?.locale ?? 'en-US', {
    month: options?.format ?? 'long',
  }).format(new Date(0, month - 1));
}

export function getMonths() {
  return [...new Array(12)].map((v, i) => ({
    month: i + 1,
    name: getMonthName(i + 1),
  }));
}
