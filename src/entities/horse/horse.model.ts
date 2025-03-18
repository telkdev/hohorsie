const CONDITION_EFFECT = 0.7

export function horseSpeed(speed: number, condition: number) {
  const randomCondition = Math.max(1, Math.floor(Math.random() * condition))
  return speed * (CONDITION_EFFECT + (1 - CONDITION_EFFECT) * (randomCondition / 100))
}
