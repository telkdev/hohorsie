import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceRoundResult from '@/views/race-schedule/RaceRoundResult.vue'

const testResult = {
  distance: 1200,
  horses: [
    {
      id: 1,
      name: 'Thunder',
      distanceInRound: 1200,
      timeInRound: 20.02,
      speed: () => 10,
      finishTime: null,
      color: 'red',
      condition: 1,
    },
    {
      id: 2,
      name: 'Lightning',
      distanceInRound: 1100,
      timeInRound: 21.02,
      speed: () => 9,
      finishTime: null,
      color: 'blue',
      condition: 2,
    },
    {
      id: 3,
      name: 'Storm',
      distanceInRound: 1000,
      timeInRound: 22.02,
      speed: () => 8,
      finishTime: null,
      color: 'green',
      condition: 3,
    },
  ],
}

let wrapper = makeWrapper()

function makeWrapper(result = testResult) {
  return mount(RaceRoundResult, {
    props: {
      result,
    },
  })
}

beforeEach(() => {
  wrapper = makeWrapper()
})

describe('RaceRoundResult', () => {
  it('renders the BaseTable with correct headers', () => {
    const headers = wrapper.findAll('th')
    expect(headers).toHaveLength(3)
    expect(headers[0].text()).toBe('Place')
    expect(headers[1].text()).toBe('Horse')
    expect(headers[2].text()).toBe('Time')
  })

  it('renders the correct number of rows in the table', () => {
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(testResult.horses.length)
  })

  it('renders the correct data in the table rows', () => {
    const rows = wrapper.findAll('tbody tr')
    rows.forEach((row, rowIndex) => {
      const cells = row.findAll('td')
      expect(cells[0].text()).toBe(String(rowIndex + 1))
      expect(cells[1].text()).toBe(testResult.horses[rowIndex].name)
    })
  })

  it.each([
    ['bg-yellow-200', 0],
    ['bg-gray-200', 1],
    ['bg-orange-200', 2],
  ])('applies the correct place className(%s)', (className, index) => {
    const cell = wrapper.get(`[data-testid="RaceRoundResult_Cell_${index}"]`)

    expect(cell.classes()).toContain(className)
  })
})
