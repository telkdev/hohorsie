import { horseSpeed } from '@/entities/horse'
import type { ID } from '@/types/id'
import type { Meters } from '@/types/units'
import { ref, type Ref } from 'vue'
import type { Race, RaceHorse, Round } from './race.types'
import { makeTime, toSeconds, type Milliseconds } from '@/utils/time'
import { sortRandom } from '@/utils/random'

const HORSES_PER_ROUND = 10
const HORSE_UPDATE_INTERVAL = 250

type Interval = ReturnType<typeof setInterval>

function horsesPerRound(horses: Ref<RaceHorse[]>, count = HORSES_PER_ROUND): Ref<RaceHorse>[] {
  const shuffledHorses = sortRandom([...horses.value])
  return shuffledHorses.slice(0, count).map((horse) => ref({ ...horse }))
}

function makeTimeInRound(startTime: Milliseconds, endTime: Milliseconds) {
  return +toSeconds(endTime - startTime).toFixed(2)
}

function updateHorseProgress(
  horse: Ref<RaceHorse>,
  distance: Meters,
  raceStartTime: number,
  interval: Interval,
  onFinish?: (horse: RaceHorse) => void,
) {
  horse.value.distanceInRound += horseSpeed(horse.value.speed, horse.value.condition)

  const isFinished = horse.value.distanceInRound >= distance
  if (isFinished) {
    const raceEndTime = makeTime()
    horse.value.timeInRound = makeTimeInRound(raceStartTime, raceEndTime)
    horse.value.distanceInRound = distance
    clearInterval(interval)
    onFinish?.(horse.value)
  }
}

function updateScoreBoard(scoreBoard: RaceHorse[], horse: RaceHorse) {
  scoreBoard.push(horse)
}

function makeRound(id: ID, distance: Meters, horses: Ref<RaceHorse>[]): Round {
  const scoreBoard: RaceHorse[] = []

  function start() {
    // on round start we track horse progress
    horses.forEach((horse) => {
      const raceStartTime = makeTime()

      const interval = setInterval(() => {
        updateHorseProgress(horse, distance, raceStartTime, interval, (horse) =>
          updateScoreBoard(scoreBoard, horse),
        )
      }, HORSE_UPDATE_INTERVAL)
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
