import type { Horse } from '@/entities/horse'
import type { ID } from '@/types/id'
import type { Meters } from '@/types/units'
import { type Ref } from 'vue'

export type RaceHorse = Horse & {
  distanceInRound: number
  timeInRound: number
}

export type Round = {
  id: ID
  distance: Meters
  horses: Ref<RaceHorse>[]
  scoreBoard: RaceHorse[]
  start: () => void
}

export type ScoreBoard = {
  horses: RaceHorse[]
  distance: Meters
}

export type Race = {
  rounds: Round[]
  scoreBoard: ScoreBoard[]
  currentRoundSequence: number
}
