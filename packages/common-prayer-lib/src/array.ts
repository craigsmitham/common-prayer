export function count(number: number) {
  return new Array(number).fill(0).map((_, i) => i + 1);
}
