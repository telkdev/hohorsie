import { describe, expect, it, vi } from 'vitest'
import { calculatePercentage, random } from '@/utils/math'

describe('calculatePercentage', () => {
  it.each([
    [50, 200, 25],
    [0, 100, 0],
    [100, 100, 100],
    [50, 0, Infinity], // Handles division by zero
  ])(
    'should calculate the correct percentage for value=%i and total=%i',
    (value, total, expected) => {
      expect(calculatePercentage(value, total)).toBe(expected)
    },
  )
})

describe('random', () => {
  it('should return a number within the specified range', () => {
    const result = random(10, 5)
    expect(result).toBeGreaterThanOrEqual(5)
    expect(result).toBeLessThanOrEqual(10)
  })

  it('should use the default range of 1 to 100 if no arguments are provided', () => {
    const result = random()
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(100)
  })

  it('should use the provided randomizer function', () => {
    const mockRandomizer = vi.fn().mockReturnValue(1)
    const result = random(10, 5, mockRandomizer)
    expect(result).toBe(10)
    expect(mockRandomizer).toHaveBeenCalled()
  })

  it('should return the "from" value if the randomizer produces a value less than the range', () => {
    const mockRandomizer = vi.fn().mockReturnValue(0)
    const result = random(10, 5, mockRandomizer)
    expect(result).toBe(5)
  })
})
