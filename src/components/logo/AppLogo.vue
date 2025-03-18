<template>
  <div class="flex items-center gap-2">
    <HorseWithRider
      class="horse relative will-change-transform w-[55px] h-[55px]"
      color="golden"
      :width="55"
      :height="55"
    />
    <span><b>"HOHORSIE"</b> Racing club</span>
  </div>
</template>

<script setup lang="ts">
import { HorseWithRider } from '../icons'
</script>
