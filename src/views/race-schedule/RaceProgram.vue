<template>
  <div>
    <BaseTable :headers="['Place', 'Name']" :rows="programRoundRows" />
  </div>
</template>

<script lang="ts" setup>
import { BaseTable } from '@/components/table'
import type { Round } from '@/entities/race'
import { computed } from 'vue'

const { programRound } = defineProps<{
  programRound: Round
}>()

const programRoundRows = computed(() => {
  return programRound.horses.map((horse, index) => [index + 1, horse.value.name])
})
</script>
