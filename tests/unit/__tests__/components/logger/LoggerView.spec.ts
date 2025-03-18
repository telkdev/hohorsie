import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LoggerView from '@/components/logger/LoggerView.vue'

const dataTestIds = {
  title: 'LoggerView_Title',
  log: (index: number) => `LoggerView_Log_${index}`,
}

const dummyLogs = ['Log 1', 'Log 2', 'Log 3']

let wrapper = makeWrapper()

function makeWrapper(title = 'Test Logger', logs = dummyLogs) {
  return mount(LoggerView, {
    props: { title, logs },
  })
}
beforeEach(() => {
  wrapper = makeWrapper()
})

describe('LoggerView', () => {
  it('renders title correctly', () => {
    const title = wrapper.find(`[data-testid="${dataTestIds.title}"]`)
    expect(title.text()).toBe('Test Logger')
  })
  it.each(dummyLogs.map((_, index) => [index]))('renders log %i correctly', (index) => {
    const log = wrapper.find(`[data-testid="${dataTestIds.log(index)}"]`)
    expect(log.text()).toBe(dummyLogs[index])
  })
})
