import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoggerStore = defineStore('logger', () => {
  const logs = ref<string[]>([])

  function log(message: string) {
    logs.value.unshift(message)
  }

  function clear() {
    logs.value = []
  }

  return {
    logs,
    log,
    clear,
  }
})
