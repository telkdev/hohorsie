import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useRaceStore } from '@/stores/race'
import type { Horse } from '@/entities/horse'
import { ref } from 'vue'
import { flushPromises } from '@vue/test-utils'

describe('Race Store', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    setActivePinia(createPinia())
  })

  it('initializes with a null race', () => {
    const raceStore = useRaceStore()
    expect(raceStore.race).toBeNull()
  })

  it('resets the race', () => {
    const raceStore = useRaceStore()
    raceStore.makeRace(ref([] as Horse[]))
    raceStore.resetRace()
    expect(raceStore.race).toBeNull()
  })

  it('finishes the race', () => {
    const raceStore = useRaceStore()
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    raceStore.finishRace()
    expect(alertSpy).toHaveBeenCalledWith('Race finished!')
    alertSpy.mockRestore()
  })

  it('starts the race', async () => {
    const raceStore = useRaceStore()
    const horses = ref<Horse[]>([
      {
        id: 0,
        name: 'Test Horse',
        color: 'red',
        condition: 100,
        speed: 17,
        distanceInRound: 0,
        timeInRound: 0,
      },
    ])
    raceStore.makeRace(horses)
    raceStore.startRace()
    vi.advanceTimersByTime(250)
    await flushPromises()
    expect(raceStore.hasStarted).toBe(true)
  })

  it('increments the round', () => {
    const raceStore = useRaceStore()
    const horses = ref<Horse[]>([
      {
        id: 0,
        name: 'Test Horse',
        color: 'red',
        condition: 100,
        speed: 17,
        distanceInRound: 0,
        timeInRound: 0,
      },
    ])
    raceStore.makeRace(horses)
    raceStore.incrementRound()
    expect(raceStore.race?.currentRoundSequence).toBe(1)
  })

  it('updates the scoreboard', () => {
    const raceStore = useRaceStore()
    const horses = ref<Horse[]>([
      {
        id: 0,
        name: 'Test Horse',
        color: 'red',
        condition: 100,
        speed: 17,
        distanceInRound: 0,
        timeInRound: 0,
      },
    ])
    raceStore.makeRace(horses)
    const scoreBoard = {
      distance: 100,
      horses: ref([
        {
          id: 0,
          name: 'Test Horse',
          color: 'red',
          condition: 100,
          speed: 17,
          distanceInRound: 100,
          timeInRound: 10,
        },
      ]),
    }
    raceStore.updateScoreBoard(scoreBoard)
    const updatedScoreBoard = raceStore.race?.scoreBoard[0]
    expect(updatedScoreBoard?.distance).toBe(100)
    expect(updatedScoreBoard?.horses).toEqual([
      {
        id: 0,
        name: 'Test Horse',
        color: 'red',
        condition: 100,
        speed: 17,
        distanceInRound: 100,
        timeInRound: 10,
      },
    ])
  })
})
