import { describe, it, expect, beforeEach } from 'vitest'
import { Ref, ref, nextTick } from 'vue'
import { useSelectedRound } from '@/components/roundSelector'
import type { Round, ScoreBoard } from '@/entities/race'

let rounds: Ref<Round[]>
let scoreBoard: Ref<ScoreBoard[]>
let currentRound: Ref<Round | undefined>

beforeEach(() => {
  rounds = ref([
    { id: 1, distance: 1000 },
    { id: 2, distance: 1500 },
    { id: 3, distance: 2000 },
  ])
  scoreBoard = ref([
    { roundId: 1, results: [] },
    { roundId: 2, results: [] },
    { roundId: 3, results: [] },
  ])
  currentRound = ref(undefined)
})

describe('useSelectedRound', () => {
  it('initializes with correct default values', () => {
    const { selectedRound, selectedResult } = useSelectedRound(rounds, scoreBoard, currentRound)
    expect(selectedRound.value).toEqual(rounds.value[0])
    expect(selectedResult.value).toEqual(scoreBoard.value[0])
  })

  it('selectRound updates selectedRoundIndex and selectedResultIndex', () => {
    const { selectedRound, selectedResult, selectRound } = useSelectedRound(
      rounds,
      scoreBoard,
      currentRound,
    )
    selectRound(1)
    expect(selectedRound.value).toEqual(rounds.value[1])
    expect(selectedResult.value).toEqual(scoreBoard.value[1])
  })

  it('watch currentRound updates selectedRoundIndex and selectedResultIndex', async () => {
    const { selectedRound, selectedResult } = useSelectedRound(rounds, scoreBoard, currentRound)
    currentRound.value = { id: 2, distance: 1500 }

    await nextTick()
    expect(selectedRound.value).toEqual(rounds.value[1])
    expect(selectedResult.value).toEqual(scoreBoard.value[1])
  })

  it('watch currentRound does not update if round is not found', () => {
    const { selectedRound, selectedResult } = useSelectedRound(rounds, scoreBoard, currentRound)
    currentRound.value = { id: 4, distance: 2500 }
    expect(selectedRound.value).toEqual(rounds.value[0])
    expect(selectedResult.value).toEqual(scoreBoard.value[0])
  })
})
