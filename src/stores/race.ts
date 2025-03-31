import { computed, ref, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'
import {
  type Race,
  type RaceHorse,
  type Round,
  type ScoreBoard,
  makeRace as initRace,
} from '@/entities/race'
import { useLoggerStore } from './logger'

function logWinners(round: Round, logger = useLoggerStore()) {
  const winners = round.scoreBoard.slice(0, 3)
  logger.log(
    `Round ${round.id} finished. Winners: ${winners.map((horse) => horse.name).join(', ')}`,
  )
}

export const useRaceStore = defineStore('race', () => {
  const race = ref<Race | null>(null)

  const hasStarted = computed(() => {
    if (!race.value) return false
    return race.value.rounds[0].horses[0].value.distanceInRound > 0
  })

  const hasFinished = computed(() => {
    if (!race.value) return false
    const lastRound = race.value.rounds[race.value.rounds.length - 1]
    return lastRound.horses.every((horse) => horse.value.distanceInRound === lastRound.distance)
  })

  const currentRound = computed<Round | null>(() => {
    return race.value?.rounds[race.value.currentRoundSequence] || null
  })

  function startRace() {
    startRound(0)
  }

  function incrementRound() {
    if (!race.value) return
    race.value.currentRoundSequence += 1
  }

  function startRound(roundNumber: number) {
    race.value?.rounds[roundNumber].start()
  }

  function updateScoreBoard(scoreBoard: ScoreBoard) {
    race.value?.scoreBoard.push(scoreBoard)
  }

  function makeRace(horses: Ref<RaceHorse[]>) {
    race.value = initRace(horses)
  }

  function resetRace() {
    race.value = null
  }

  function finishRace() {
    alert('Race finished!')
  }

  useRaceStore().$onAction(({ name }) => {
    if (name === 'startRace') {
      useRaceTrack(race, currentRound)
    }
  })

  return {
    race,
    hasStarted,
    hasFinished,
    currentRound,
    makeRace,
    resetRace,
    startRace,
    startRound,
    finishRace,
    updateScoreBoard,
    incrementRound,
  }
})

function useRaceTrack(
  race: Ref<Race | null>,
  currentRound: Ref<Round | null>,
  logger = useLoggerStore(),
) {
  const isRoundFinished = computed(() => {
    return currentRound.value?.horses.every(
      (horse) => horse.value.distanceInRound >= currentRound.value!.distance,
    )
  })

  watch(isRoundFinished, (isFinished) => {
    if (!currentRound.value) return
    if (isFinished) {
      onRoundFinished(currentRound.value)
    }
  })

  function onRoundFinished(round: Round) {
    if (!race.value) return

    logWinners(round)

    useRaceStore().updateScoreBoard({
      distance: round.distance,
      horses: round.scoreBoard.map((horse) => horse),
    })

    useRaceStore().incrementRound()

    if (race.value.currentRoundSequence >= race.value.rounds.length) {
      logger.log('Race finished, thanks for watching!')
      useRaceStore().finishRace()
    } else {
      currentRound.value?.start()
    }
  }
}
