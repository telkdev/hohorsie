import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'

import { flushPromises, mount } from '@vue/test-utils'
import { GenerateRaceButton } from '@/components/button'
import { useRaceStore } from '@/stores/race'
import { storeToRefs } from 'pinia'
import { nextTick } from 'vue'
import { useHorsesStore } from '@/stores/horses'

let wrapper = makeWrapper()

function makeWrapper() {
  return mount(GenerateRaceButton, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })],
    },
  })
}

beforeEach(() => {
  vi.useFakeTimers()

  wrapper = makeWrapper()
})

describe('GenerateRaceButton', () => {
  it('generates horses on click', async () => {
    const { horses } = storeToRefs(useHorsesStore())
    expect(horses.value).toStrictEqual([])

    await wrapper.trigger('click')

    await nextTick()
    expect(horses.value).toHaveLength(20)
  })
  it('generates race on click', async () => {
    const { race } = storeToRefs(useRaceStore())
    expect(race.value).toBeNull()

    await wrapper.trigger('click')

    await nextTick()
    expect(race.value).not.toBeNull()
  })
  it('disables button when race started', async () => {
    const button = wrapper.get('button')
    await button.trigger('click')
    useRaceStore().startRace()

    vi.advanceTimersByTime(250)
    await flushPromises()
    expect(button.attributes().disabled).toBeDefined()
  })
})
