<template>
  <div v-if="horses.length" data-testid="HorseList_Horses">
    <h2 class="font-semibold text-xl mb-1">Horse list</h2>
    <BaseTable :headers="headers" :rows="rows" class="basis-0 grow-1" />
  </div>
  <span v-else data-testid="HorseList_NoHorses">No horses available yet...</span>
</template>

<script setup lang="ts">
import { BaseTable } from '@/components/table/'
import { useHorsesStore } from '@/stores/horses'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const horsesStore = useHorsesStore()
const { horses } = storeToRefs(horsesStore)

const headers = ['Name', 'Condition', 'Color']
const rows = computed(() => {
  return horses.value.map((horse) => {
    return [horse.name, horse.condition.toString(), horse.color]
  })
})
</script>
