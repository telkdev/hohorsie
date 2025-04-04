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
            :data-testid="`RoundTrack_Horse_${horse.value.name}`"
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
import type { RaceHorse } from '@/entities/race'
import { useRaceStore } from '@/stores/race'
import { calculatePercentage } from '@/utils/math'
import { storeToRefs } from 'pinia'

const INCLINE_MULTIPLIER = 0.05
const MAX_INCLINE = 10
const TRANSITION_DURATION = 0.25

const raceStore = useRaceStore()
const { currentRound } = storeToRefs(raceStore)

function horseProgressStyles(horse: RaceHorse) {
  if (!currentRound.value) return {}
  const trackPassedPercentage = calculatePercentage(
    horse.distanceInRound,
    currentRound.value.distance,
  )
  // incline needed to transform the horse for simulating running
  const incline = Math.sin(horse.distanceInRound * INCLINE_MULTIPLIER) * MAX_INCLINE

  return {
    left: `calc(${trackPassedPercentage}%`,
    transition: `left ${TRANSITION_DURATION}s linear, transform ${TRANSITION_DURATION}s linear`,
    transform: `rotate(${incline}deg)`,
  }
}
</script>
