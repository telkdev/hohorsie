import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { StartRaceButton } from '@/components/button'
import { useRaceStore } from '@/stores/race'
import { storeToRefs } from 'pinia'
import { makeRace } from '../../helpers'

let wrapper = makeWrapper()

function makeWrapper() {
  return mount(StartRaceButton, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })],
    },
  })
}

beforeEach(() => {
  vi.useFakeTimers()

  wrapper = makeWrapper()
})

describe('StartRaceButton', () => {
  it('should be disabled if no race or horses', async () => {
    const button = wrapper.get('button')
    expect(button.attributes().disabled).toBeDefined()

    await makeRace()

    expect(button.attributes().disabled).toBeUndefined()
  })
  it('generates race on click', async () => {
    await makeRace()

    const { hasStarted } = storeToRefs(useRaceStore())

    expect(hasStarted.value).toBeFalsy()
    const button = wrapper.get('button')
    await button.trigger('click')

    vi.advanceTimersByTime(250)
    expect(hasStarted.value).toBeTruthy()
  })
})
