import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceProgram from '@/views/race-schedule/RaceProgram.vue'
import { makeDummyRound } from '../../dummyData/dummyRound'

let wrapper = makeWrapper()

const testRound = makeDummyRound()

function makeWrapper(programRound = makeDummyRound()) {
  return mount(RaceProgram, {
    props: {
      programRound,
    },
  })
}

beforeEach(() => {
  wrapper = makeWrapper()
})

describe('RaceProgram', () => {
  it('renders the BaseTable with correct headers', () => {
    const headers = wrapper.findAll('th')
    expect(headers).toHaveLength(2)
    expect(headers[0].text()).toBe('Place')
    expect(headers[1].text()).toBe('Name')
  })

  it('renders the correct number of rows in the table', () => {
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(testRound.horses.length)
  })

  it('renders the correct data in the table rows', () => {
    const rows = wrapper.findAll('tbody tr')
    rows.forEach((row, rowIndex) => {
      const cells = row.findAll('td')
      expect(cells[0].text()).toBe(String(rowIndex + 1))
      expect(cells[1].text()).toBe(testRound.horses[rowIndex].value.name)
    })
  })
})
