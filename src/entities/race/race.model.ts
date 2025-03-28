import { horseSpeed } from '@/entities/horse'
import type { ID } from '@/types/id'
import type { Meters } from '@/types/units'
import { ref, type Ref } from 'vue'
import type { Race, RaceHorse, Round } from './race.types'

const HORSES_PER_ROUND = 10
function horsesPerRound(horses: Ref<RaceHorse[]>, count = HORSES_PER_ROUND): Ref<RaceHorse>[] {
  const shuffledHorses = [...horses.value].sort(() => Math.random() - 0.5)
  return shuffledHorses.slice(0, count).map((horse) => ref({ ...horse }))
}

function makeTime() {
  return +new Date()
}

function makeRound(id: ID, distance: Meters, horses: Ref<RaceHorse>[]): Round {
  const scoreBoard: RaceHorse[] = []

  function start() {
    horses.forEach((horse) => {
      const raceStartTime = makeTime()
      const interval = setInterval(() => {
        horse.value.distanceInRound += horseSpeed(horse.value.speed, horse.value.condition)

        const isFinished = horse.value.distanceInRound >= distance
        if (isFinished) {
          const raceEndTime = makeTime()
          horse.value.timeInRound = +((raceEndTime - raceStartTime) / 1000).toFixed(2)
          horse.value.distanceInRound = distance
          scoreBoard.push(horse.value)
          clearInterval(interval)
        }
      }, 250)
    })
  }

  return { id, distance, horses, scoreBoard, start }
}

export function makeRace(horses: Ref<RaceHorse[]>): Race {
  const distances: Meters[] = [1200, 1400, 1600, 1800, 2000, 2200]
  const rounds = distances.map((distance, index) =>
    makeRound(index + 1, distance, horsesPerRound(horses)),
  )

  return {
    rounds,
    scoreBoard: [],
    currentRoundSequence: 0,
  }
}
