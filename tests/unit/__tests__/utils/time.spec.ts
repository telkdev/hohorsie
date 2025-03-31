import { describe, expect, it } from 'vitest'
import { toSeconds, makeTime, makeLocaleTime } from '@/utils/time'

describe('toSeconds', () => {
  it('should convert milliseconds to seconds', () => {
    expect(toSeconds(1000)).toBe(1)
    expect(toSeconds(500)).toBe(0.5)
    expect(toSeconds(0)).toBe(0)
  })
})

describe('makeTime', () => {
  it('should return the current timestamp in milliseconds', () => {
    const now = +new Date()
    expect(makeTime()).toBeGreaterThanOrEqual(now)
  })
})

describe('makeLocaleTime', () => {
  it('should return a valid locale time string', () => {
    const localeTime = makeLocaleTime()
    expect(typeof localeTime).toBe('string')
    expect(localeTime).toMatch(/^\d{1,2}:\d{2}:\d{2}/) // Matches time format like "12:34:56"
  })
})
