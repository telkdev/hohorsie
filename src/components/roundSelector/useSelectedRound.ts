import type { Round, ScoreBoard } from '@/entities/race'
import { computed, ref, watch, type Ref } from 'vue'

export function useSelectedRound(
  rounds: Ref<Round[]>,
  scoreBoard: Ref<ScoreBoard[]>,
  currentRound: Ref<Round | null>,
) {
  const selectedRoundIndex = ref(0)
  const selectedResultIndex = ref(0)

  const selectedRound = computed(() => {
    return rounds.value[selectedRoundIndex.value] || null
  })

  const selectedResult = computed(() => {
    return scoreBoard.value[selectedResultIndex.value] || null
  })

  function selectRound(index: number) {
    selectedRoundIndex.value = index
    selectedResultIndex.value = index
  }

  watch(currentRound, (val) => {
    if (!val) return
    const index = rounds.value.findIndex((round) => round.id === val.id)
    if (!index || selectedRoundIndex.value !== index - 1) return

    selectRound(index)
  })

  return {
    selectedRoundIndex,
    selectedResultIndex,
    selectedRound,
    selectedResult,
    selectRound,
  }
}
