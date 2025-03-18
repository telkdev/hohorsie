<template>
  <Logger title="Race Announcer" :logs="logs" />
</template>

<script setup lang="ts">
import { Logger } from '@/components/logger'
import { useLoggerStore } from '@/stores/logger'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const loggerStore = useLoggerStore()
const { logs } = storeToRefs(loggerStore)

onMounted(() => {
  loggerStore.log('Greetings ladies and gentlemen, this is the race announcer speaking.')
  loggerStore.log('We are about to start the horse race, please be seated and enjoy the show.')
})
</script>
