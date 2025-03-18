<template>
  <BaseButton
    text="Start"
    class="bg-green-700 text-white px-4 py-2 rounded-[10px] active:bg-emerald-700 transition-colors"
    :disabled="hasStarted || !race"
    data-testid="StartRaceButton_Button"
    @click="startRace"
  />
</template>

<script setup lang="ts">
import { useRaceStore } from '@/stores/race'
import { BaseButton } from '.'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const raceStore = useRaceStore()
const { hasStarted, race } = storeToRefs(raceStore)

function startRace() {
  raceStore.startRace()
}

onMounted(() => {
  raceStore.startRace()
})
</script>
