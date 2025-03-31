export function calculatePercentage(value: number, total: number) {
  return (value / total) * 100
}

export function random(to = 100, from = 1, randomizer = Math.random) {
  return Math.max(from, Math.floor(randomizer() * to))
}
