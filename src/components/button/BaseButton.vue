<template>
  <button
    class="cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
    @click="emit('click')"
  >
    {{ renderedText }}
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { text } = defineProps<{
  text?: string
}>()

const emit = defineEmits<{
  click: []
}>()

const renderedText = computed(() => text || 'Click')
</script>
