<template>
  <header class="bg-green-300">
    <div class="max-w-[1920px] mx-auto py-2 px-4 flex items-center justify-between flex-wrap">
      <AppLogo class="mr-2" />

      <div class="flex items-center gap-2 w-full xs:w-auto">
        <GenerateRaceButton class="grow" />
        <StartRaceButton class="grow" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { GenerateRaceButton, StartRaceButton } from '../button'
import { AppLogo } from '@/components/logo'
</script>
