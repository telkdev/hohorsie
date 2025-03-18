import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useLoggerStore } from '@/stores/logger'

describe('Logger Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('initializes with an empty log', () => {
    const logger = useLoggerStore()
    expect(logger.logs).toHaveLength(0)
  })

  it('logs messages', () => {
    const logger = useLoggerStore()
    logger.log('Test message')
    expect(logger.logs).toHaveLength(1)
    expect(logger.logs[0]).toBe('Test message')
  })

  it('clears the logs', () => {
    const logger = useLoggerStore()
    logger.log('First log')
    logger.log('Second log')
    logger.clear()
    expect(logger.logs).toHaveLength(0)
  })
})
