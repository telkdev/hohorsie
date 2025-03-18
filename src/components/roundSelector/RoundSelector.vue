<template>
  <div>
    <h3 class="font-semibold text-xl mb-1">Rounds</h3>
    <ul class="flex gap-1 flex-wrap">
      <li v-for="(round, index) in rounds" :key="round.id">
        <BaseButton
          :text="round.distance + 'm'"
          @click="selectRound(index)"
          :class="[
            'px-4 py-2 border rounded-[10px] cursor-pointer',
            selectedIndex === index ? 'bg-green-300 border-green-300 ' : 'border-green-300',
            isCurrentRound(round) ? 'bg-green-700 border-green-700 text-white' : '',
          ]"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import type { Round } from '@/entities/race'
import { BaseButton } from '../button'

const { currentRound, rounds, selectedIndex } = defineProps<{
  rounds: Round[]
  selectedIndex: number
  currentRound: Round | null
}>()

const emit = defineEmits<{
  'update:selectedIndex': [number]
}>()

function selectRound(index: number) {
  emit('update:selectedIndex', index)
}

function isCurrentRound(round: Round) {
  return currentRound && currentRound.id === round.id
}
</script>
