<template>
  <BaseButton
    text="Generate"
    class="bg-green-700 text-white px-4 py-2 rounded-[10px] active:bg-emerald-700 transition-colors"
    :disabled="hasStarted && !hasFinished"
    @click="generateRace"
  />
</template>

<script setup lang="ts">
import { useRaceStore } from '@/stores/race'
import { BaseButton } from '.'
import { storeToRefs } from 'pinia'
import { useHorsesStore } from '@/stores/horses'
import type { RaceHorse } from '@/entities/race'
import { computed } from 'vue'

const horsesStore = useHorsesStore()
const { horses } = storeToRefs(horsesStore)

const raceStore = useRaceStore()
const { hasStarted, hasFinished } = storeToRefs(raceStore)

function generateRace() {
  horsesStore.generateHorses()

  const raceHorses = computed<RaceHorse[]>(() =>
    horses.value.map((horse) => ({
      ...horse,
      distanceInRound: 0,
      timeInRound: 0,
    })),
  )

  raceStore.makeRace(raceHorses)
}
</script>
