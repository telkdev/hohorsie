const CONDITION_EFFECT = 0.7
const SPEED_COEFFICIENT = 0.5

export function horseSpeed(speed: number, condition: number) {
  const randomCondition = Math.max(1, Math.floor(Math.random() * condition))
  const realSpeed = speed * SPEED_COEFFICIENT
  return realSpeed * (CONDITION_EFFECT + (1 - CONDITION_EFFECT) * (randomCondition / 100))
}
