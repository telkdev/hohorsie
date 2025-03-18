import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoggerStore = defineStore('logger', () => {
  const logs = ref<string[]>([])

  function log(message: string) {
    const time = new Date().toLocaleTimeString()

    logs.value.unshift(`${time}: ${message}`)
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
