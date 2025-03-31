export function sortRandom<T extends unknown[]>(array: T) {
  return array.sort(() => Math.random() - 0.5)
}
