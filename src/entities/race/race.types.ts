import type { Horse } from '@/entities/horse'
import type { ID } from '@/types/id'
import type { Meters } from '@/types/units'
import { type Ref } from 'vue'

export type Round = {
  id: ID
  distance: Meters
  horses: Ref<Horse>[]
  scoreBoard: Horse[]
  start: () => void
}

export type ScoreBoard = {
  horses: Horse[]
  distance: Meters
}

export type Race = {
  rounds: Round[]
  scoreBoard: ScoreBoard[]
  currentRoundSequence: number
}
