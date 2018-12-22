/* tslint:disable */
export function shuffle<T>(ar: T[]): T[] {
  for (
    let j, x, i = ar.length;
    i;
    j = Math.floor(Math.random() * i), x = ar[--i], ar[i] = ar[j], ar[j] = x
  ) {}
  return ar;
}
