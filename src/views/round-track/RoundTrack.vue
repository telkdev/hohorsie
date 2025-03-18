<template>
  <div v-if="currentRound">
    <h1 class="font-semibold text-xl text-center mb-1">
      Current lap: {{ currentRound.id }}; Distance: {{ currentRound.distance }}m
    </h1>
    <ul class="flex flex-col gap-0.5 w-full relative rounded-[10px]">
      <li
        v-for="(horse, index) in currentRound.horses"
        :key="index"
        class="flex py-1 odd:bg-green-700 even:bg-emerald-700 first:rounded-t-xl last:rounded-b-xl will-change-[left]"
      >
        <div class="relative grow z-10">
          <div class="absolute h-full w-0 flex items-center left-3">
            <span class="absolute text-base text-white">{{ index + 1 }}</span>
          </div>
          <HorseWithRider
            class="horse relative will-change-transform w-[55px] h-[55px]"
            :color="horse.value.color"
            :width="55"
            :height="55"
            :style="horseProgressStyles(horse.value)"
          />
        </div>
        <div class="w-[55px] border-l-2 border-red-800">
          <span class="block w-fit h-full text-base -rotate-z-90 text-white uppercase">Finish</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { HorseWithRider } from '@/components/icons'
import type { Horse } from '@/entities/horse'
import { useRaceStore } from '@/stores/race'
import { storeToRefs } from 'pinia'

const raceStore = useRaceStore()
const { currentRound } = storeToRefs(raceStore)

function horseProgressStyles(horse: Horse) {
  if (!currentRound.value) return {}
  const percentage = (horse.distanceInRound / currentRound.value.distance) * 100
  const incline = Math.sin(horse.distanceInRound * 0.05) * 30

  return {
    left: `calc(${percentage}%`,
    transition: 'transform 1s linear',
    transform: `rotate(${incline}deg)`,
  }
}
</script>
