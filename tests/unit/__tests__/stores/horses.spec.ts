import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useHorsesStore } from '@/stores/horses'

const DEFAULT_SPEED = 17 * 3
const HORSES_COUNT = 20

describe('Horses Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with an empty horses array', () => {
    const horsesStore = useHorsesStore()
    expect(horsesStore.horses).toHaveLength(0)
  })

  it('generates horses', () => {
    const horsesStore = useHorsesStore()
    horsesStore.generateHorses()
    expect(horsesStore.horses).toHaveLength(HORSES_COUNT)
  })

  it.each(Array.from({ length: HORSES_COUNT }).map((_, i) => [i]))(
    'generates horse %i with correct properties',
    (index) => {
      const horsesStore = useHorsesStore()
      horsesStore.generateHorses()
      const horse = horsesStore.horses[index]
      expect(horse.id).toBe(index)
      expect(horse.name).toBeDefined()
      expect(horse.color).toBeDefined()
      expect(horse.condition).toBeGreaterThan(0)
      expect(horse.speed).toBe(DEFAULT_SPEED)
    },
  )
})
