import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RoundTrack from '@/views/round-track/RoundTrack.vue'
import { createTestingPinia } from '@pinia/testing'
import { useRaceStore } from '@/stores/race'
import { nextTick, ref } from 'vue'

const testRound = {
  id: 1,
  distance: 1200,
  horses: [
    ref({
      id: 1,
      name: 'Thunder',
      distanceInRound: 1200,
      color: 'red',
    }),
  ],
}

let wrapper = makeWrapper()

function makeWrapper() {
  return mount(RoundTrack, {
    global: {
      plugins: [createTestingPinia({ stubActions: false })],
    },
  })
}

beforeEach(() => {
  wrapper = makeWrapper()
})

async function makeCurrentRound() {
  const raceStore = useRaceStore()
  raceStore.currentRound = testRound
  await nextTick()
}

const dataTestIds = {
  horse: (name: string) => `RoundTrack_Horse_${name}`,
}

describe('RoundTrack', () => {
  it('renders the correct number of horses', async () => {
    await makeCurrentRound()

    const horses = wrapper.findAll('.horse')
    expect(horses).toHaveLength(testRound.horses.length)
  })

  it.each([['Thunder', 0]])(
    'renders horses with correct positions and classes',
    async (name, index) => {
      await makeCurrentRound()
      const horse = wrapper.get(`[data-testid="${dataTestIds.horse(name)}"]`)

      const horseData = testRound.horses[index]
      const percentage = (horseData.value.distanceInRound / testRound.distance) * 100
      const incline = Math.sin(horseData.value.distanceInRound * 0.05) * 30

      expect(horse.attributes('style')).toContain(`left: calc(${percentage}%`)
      expect(horse.attributes('style')).toContain(`transform: rotate(${incline}deg)`)
    },
  )
})
