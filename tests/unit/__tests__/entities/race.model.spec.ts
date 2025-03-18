import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { makeRace } from '@/entities/race/race.model'
import type { Horse } from '@/entities/horse'

describe('Race Model', () => {
  it('creates a race with multiple rounds', () => {
    const horses = ref<Horse[]>([
      {
        id: 0,
        name: 'Horse 1',
        color: 'red',
        condition: 100,
        speed: 17,
        distanceInRound: 0,
        timeInRound: 0,
      },
      {
        id: 1,
        name: 'Horse 2',
        color: 'blue',
        condition: 100,
        speed: 17,
        distanceInRound: 0,
        timeInRound: 0,
      },
    ])
    const race = makeRace(horses)
    expect(race.rounds).toHaveLength(6)
    expect(race.rounds[0].distance).toBe(1200)
    expect(race.rounds[1].distance).toBe(1400)
    expect(race.rounds[2].distance).toBe(1600)
    expect(race.rounds[3].distance).toBe(1800)
    expect(race.rounds[4].distance).toBe(2000)
    expect(race.rounds[5].distance).toBe(2200)
  })

  it('creates a round with horses', () => {
    const horses = ref<Horse[]>([
      {
        id: 0,
        name: 'Horse 1',
        color: 'red',
        condition: 100,
        speed: 17,
        distanceInRound: 0,
        timeInRound: 0,
      },
      {
        id: 1,
        name: 'Horse 2',
        color: 'blue',
        condition: 100,
        speed: 17,
        distanceInRound: 0,
        timeInRound: 0,
      },
    ])
    const race = makeRace(horses)
    const round = race.rounds[0]
    expect(round.id).toBe(1)
    expect(round.distance).toBe(1200)
    expect(round.horses).toHaveLength(2)
  })

  it('starts a round and updates horse distances', async () => {
    vi.useFakeTimers()
    const horses = ref<Horse[]>([
      {
        id: 0,
        name: 'Horse 1',
        color: 'red',
        condition: 100,
        speed: 17,
        distanceInRound: 0,
        timeInRound: 0,
      },
      {
        id: 1,
        name: 'Horse 2',
        color: 'blue',
        condition: 100,
        speed: 17,
        distanceInRound: 0,
        timeInRound: 0,
      },
    ])
    const race = makeRace(horses)
    const round = race.rounds[0]
    round.start()
    vi.advanceTimersByTime(250)
    expect(round.horses[0].value.distanceInRound).toBeGreaterThan(0)
    expect(round.horses[1].value.distanceInRound).toBeGreaterThan(0)
    vi.useRealTimers()
  })
})
