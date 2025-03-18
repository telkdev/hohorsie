<template>
  <div class="flex flex-col h-full font-mono">
    <Header />
    <main class="bg-zinc-200 flex-grow">
      <div
        class="max-w-[1920px] mx-auto py-2 px-4 gap-2 race-wrapper"
        :class="{ 'race-wrapper-finished': hasFinished }"
      >
        <HorseList class="horse-list" />
        <RoundTrack class="round-track" />
        <RaceSchedule class="race-schedule" />
        <RaceAnnouncer class="race-announcer" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Header } from './components/header'
import RaceAnnouncer from './views/announcer/RaceAnnouncer.vue'
import { HorseList } from './views/horse-list'
import { RaceSchedule } from './views/race-schedule'
import { RoundTrack } from './views/round-track'
import { useRaceStore } from './stores/race'

const { hasFinished } = storeToRefs(useRaceStore())
</script>

<style scoped>
.race-wrapper {
  display: grid;
  grid-template-areas:
    'announcer'
    'track'
    'horse-list'
    'schedule';
}

.race-wrapper-finished {
  grid-template-areas:
    'announcer'
    'horse-list'
    'schedule';
}

@media (min-width: 992px) {
  .race-wrapper {
    grid-template-areas:
      'horse-list track schedule'
      'announcer announcer announcer';
    grid-template-columns: 1fr 2fr 1fr;
  }

  .race-wrapper-finished {
    grid-template-areas:
      'horse-list schedule schedule'
      'announcer announcer announcer';
  }
}

@media (min-width: 1400px) {
  .race-wrapper {
    grid-template-areas:
      'horse-list track schedule'
      'horse-list track announcer';
    grid-template-columns: 1fr 2fr 1fr;
  }

  .race-wrapper-finished {
    grid-template-areas:
      'horse-list schedule schedule'
      'horse-list announcer announcer';
  }
}

.horse-list {
  grid-area: horse-list;
}

.race-schedule {
  grid-area: schedule;
}

.round-track {
  grid-area: track;
}

.race-announcer {
  grid-area: announcer;
}
</style>
