<template>
  <div class="max-h-[200px] overflow-y-auto p-2 bg-white shadow-md rounded-[10px]">
    <h3 class="font-bold mb-2" data-testid="LoggerView_Title">{{ title }}</h3>
    <ul class="space-y-1">
      <li v-for="(log, index) in logs" :key="index" :data-testid="`LoggerView_Log_${index}`">
        {{ log }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { title, logs } = defineProps<{
  title: string
  logs: string[]
}>()
</script>
