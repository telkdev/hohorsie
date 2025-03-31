import { describe, expect, it } from 'vitest'
import { sortRandom } from '@/utils/random'

describe('sortRandom', () => {
  it('should return an array with the same elements in a different order', () => {
    const array = [1, 2, 3, 4, 5]
    const shuffledArray = sortRandom([...array])

    expect(shuffledArray).toHaveLength(array.length)
    expect(shuffledArray.sort()).toEqual(array.sort())
  })

  it('should handle an empty array', () => {
    const array: number[] = []
    expect(sortRandom(array)).toEqual([])
  })
})
