<template>
  <div v-if="race">
    <div class="grid grid-cols-2 gap-2 mb-4">
      <div>
        <h2 class="font-semibold text-xl mb-1">Schedule</h2>
        <ul class="space-y-2">
          <li v-if="selectedRound">
            <RaceProgram :program-round="selectedRound" />
          </li>
        </ul>
      </div>
      <div>
        <h2 class="font-semibold text-xl mb-1">Results</h2>
        <div class="space-y-2">
          <RaceRoundResult v-if="selectedResult" :result="selectedResult" />
          <span v-else>No results yet...</span>
        </div>
      </div>
    </div>
    <RoundSelector
      :rounds="race.rounds"
      :selectedIndex="selectedIndex"
      :currentRound="currentRound || null"
      @update:selectedIndex="selectRound"
    />
  </div>
  <span v-else>No races scheduled yet...</span>
</template>

<script setup lang="ts">
import RaceProgram from './RaceProgram.vue'
import RaceRoundResult from './RaceRoundResult.vue'
import { useRaceStore } from '@/stores/race'
import { storeToRefs } from 'pinia'
import { useSelectedRound, RoundSelector } from '@/components/roundSelector'
import { computed } from 'vue'

const raceStore = useRaceStore()
const { race, currentRound } = storeToRefs(raceStore)

const {
  selectedRoundIndex: selectedIndex,
  selectedRound,
  selectedResult,
  selectRound,
} = useSelectedRound(
  computed(() => race.value?.rounds || []),
  computed(() => race.value?.scoreBoard || []),
  currentRound,
)
</script>
