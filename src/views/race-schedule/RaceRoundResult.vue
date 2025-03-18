<template>
  <div>
    <BaseTable :headers="headers" :rows="rows">
      <template #cell="{ cell, rowIndex }">
        <span
          :class="placeColor(rowIndex)"
          class="py-1 px-2 flex"
          :data-testid="`RaceRoundResult_Cell_${rowIndex}`"
        >
          {{ cell }}
        </span>
      </template>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import { BaseTable } from '@/components/table'
import type { RaceHorse } from '@/entities/race'
import { computed } from 'vue'

type RaceResult = {
  distance: number
  horses: RaceHorse[]
}

const { result } = defineProps<{
  result: RaceResult
}>()

const headers = ['Place', 'Horse', 'Time']
const rows = computed(() => {
  return result.horses.map((horse, index) => [index + 1, horse.name, `${horse.timeInRound}s`])
})

function placeColor(index: number) {
  if (index === 0) return 'bg-yellow-200'
  if (index === 1) return 'bg-gray-200'
  if (index === 2) return 'bg-orange-200'
  return ''
}
</script>
