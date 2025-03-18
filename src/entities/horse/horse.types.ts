import type { ID } from '@/types/id'

export type Horse = {
  id: ID
  name: string
  color: string
  condition: number
  speed: number
  distanceInRound: number
  timeInRound: number
}
