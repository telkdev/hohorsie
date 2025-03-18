import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceAnnouncer from '@/views/announcer/RaceAnnouncer.vue'
import { createTestingPinia } from '@pinia/testing'
import { storeToRefs } from 'pinia'
import { useLoggerStore } from '@/stores/logger'

let wrapper = makeWrapper()

function makeWrapper() {
  return mount(RaceAnnouncer, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })],
    },
  })
}

beforeEach(() => {
  wrapper = makeWrapper()
})

describe('RaceAnnouncer', () => {
  it('should log welcome logs on mount', () => {
    const logs = wrapper.findAll('li')

    expect(logs.length).toBe(2)
    const loggerStore = storeToRefs(useLoggerStore())

    expect(logs[0].text()).toBe(loggerStore.logs.value[0])
    expect(logs[1].text()).toBe(loggerStore.logs.value[1])
  })
})
