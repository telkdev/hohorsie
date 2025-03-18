import type { RaceHorse } from '@/entities/race'
import { useHorsesStore } from '@/stores/horses'
import { useRaceStore } from '@/stores/race'
import { storeToRefs } from 'pinia'
import { computed, nextTick } from 'vue'

export async function generateHorses() {
  const horsesStore = useHorsesStore()
  horsesStore.generateHorses()
  await nextTick()
}

export async function makeRace() {
  await generateHorses()
  const { horses } = storeToRefs(useHorsesStore())
  const raceHorses = computed<RaceHorse[]>(() =>
    horses.value.map((horse) => ({
      ...horse,
      distanceInRound: 0,
      timeInRound: 0,
    })),
  )
  useRaceStore().makeRace(raceHorses)
  await nextTick()
}
