import { describe, it, expect, vi } from 'vitest'
import { horseSpeed } from '@/entities/horse/horse.model'
import { beforeEach } from 'node:test'

beforeEach(() => {
  vi.restoreAllMocks()
})
describe('horseSpeed', () => {
  it('calculates speed based on condition', () => {
    const speed = 20
    const condition = 80
    const randomCondition = 50
    vi.spyOn(Math, 'random').mockReturnValue(randomCondition / 100)

    const result = horseSpeed(speed, condition)
    const expectedSpeed = 8.2

    expect(result).toBe(expectedSpeed)
  })

  it('ensures minimum condition of 1', () => {
    const speed = 20
    const condition = 0
    const randomCondition = 0
    vi.spyOn(Math, 'random').mockReturnValue(randomCondition / 100)

    const result = horseSpeed(speed, condition)
    const expectedSpeed = speed * 0.5 * (0.7 + (1 - 0.7) * (1 / 100))

    expect(result).toBeCloseTo(expectedSpeed)
  })
})
