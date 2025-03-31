import { random } from "@/utils/math"

const CONDITION_EFFECT = 0.7
// depending on a condition we simulate horse's speed change
export function horseSpeed(speed: number, condition: number) {
  const randomCondition = random(condition)
  return speed * (CONDITION_EFFECT + (1 - CONDITION_EFFECT) * (randomCondition / 100))
}
