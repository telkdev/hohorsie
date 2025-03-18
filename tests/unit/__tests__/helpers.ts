import { useHorsesStore } from '@/stores/horses'
import { useRaceStore } from '@/stores/race'
import { storeToRefs } from 'pinia'
import { nextTick } from 'vue'

export async function generateHorses() {
  const horsesStore = useHorsesStore()
  horsesStore.generateHorses()
  await nextTick()
}

export async function makeRace() {
  await generateHorses()
  const { horses } = storeToRefs(useHorsesStore())

  useRaceStore().makeRace(horses)
  await nextTick()
}
