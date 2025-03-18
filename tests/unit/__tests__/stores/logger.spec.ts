import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useLoggerStore } from '@/stores/logger'

describe('Logger Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  const formatTime = (date: Date) =>
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
      .format(date)
      .padStart(8, '0')

  it('initializes with an empty log', () => {
    const logger = useLoggerStore()
    expect(logger.logs).toHaveLength(0)
  })

  it('logs messages with timestamp', () => {
    const logger = useLoggerStore()
    const testMessage = 'Test message'
    const testTime = formatTime(new Date('2023-01-01T12:00:00'))

    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-01-01T12:00:00'))

    logger.log(testMessage)
    expect(logger.logs).toHaveLength(1)
    expect(logger.logs[0]).toBe(`${testTime}: ${testMessage}`)

    vi.useRealTimers()
  })

  it('logs multiple messages with timestamps', () => {
    const logger = useLoggerStore()
    const firstMessage = 'First log'
    const secondMessage = 'Second log'

    vi.useFakeTimers()
    vi.setSystemTime(new Date('2023-01-01T12:00:00'))
    const firstTime = formatTime(new Date())

    logger.log(firstMessage)

    vi.setSystemTime(new Date('2023-01-01T12:01:00'))
    const secondTime = formatTime(new Date())

    logger.log(secondMessage)

    expect(logger.logs).toHaveLength(2)
    expect(logger.logs[0]).toBe(`${secondTime}: ${secondMessage}`)
    expect(logger.logs[1]).toBe(`${firstTime}: ${firstMessage}`)

    vi.useRealTimers()
  })

  it('clears the logs', () => {
    const logger = useLoggerStore()
    logger.log('First log')
    logger.log('Second log')
    logger.clear()
    expect(logger.logs).toHaveLength(0)
  })
})
