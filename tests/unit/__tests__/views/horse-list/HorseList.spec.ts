import { describe, it, expect, beforeEach } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import HorseList from '@/views/horse-list/HorseList.vue'
import { createTestingPinia } from '@pinia/testing'
import { generateHorses } from '../../helpers'

const testIds = {
  noHorses: 'HorseList_NoHorses',
  horseList: 'HorseList_Horses',
}

let wrapper = makeWrapper()

function makeWrapper() {
  return shallowMount(HorseList, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })],
    },
  })
}

beforeEach(() => {
  wrapper = makeWrapper()
})

describe('HorseList', () => {
  it('shows no horse list if there are no horses yet', () => {
    const noHorses = wrapper.get(`[data-testid="${testIds.noHorses}"]`)
    expect(noHorses.exists()).toBeTruthy()
  })
  it('shows the list of horses', async () => {
    await generateHorses()

    const horseList = wrapper.get(`[data-testid="${testIds.horseList}"]`)
    expect(horseList.exists()).toBeTruthy()
  })
})
