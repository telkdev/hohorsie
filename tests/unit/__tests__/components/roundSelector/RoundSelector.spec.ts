import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { RoundSelector } from '@/components/roundSelector'
import type { Round } from '@/entities/race'

const testRounds: Round[] = [
  { id: 1, distance: 1000 },
  { id: 2, distance: 1500 },
  { id: 3, distance: 2000 },
]

const currentRound: Round = { id: 2, distance: 1500 }

let wrapper = makeWrapper()

function makeWrapper(selectedIndex = 0, rounds = testRounds, currentRound = null) {
  return mount(RoundSelector, {
    props: {
      rounds,
      selectedIndex,
      currentRound,
    },
  })
}

beforeEach(() => {
  wrapper = makeWrapper()
})

describe('RoundSelector', () => {
  it('renders rounds correctly', () => {
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(testRounds.length)
    buttons.forEach((button, index) => {
      expect(button.text()).toBe(`${testRounds[index].distance}m`)
    })
  })

  it('applies selected class to the selected round', () => {
    const selectedButton = wrapper.find('.bg-green-300')
    expect(selectedButton.exists()).toBe(true)
    expect(selectedButton.text()).toBe(`${testRounds[0].distance}m`)
  })

  it('applies current round class to the current round', () => {
    wrapper = makeWrapper(0, testRounds, currentRound)
    const currentButton = wrapper.find('.bg-green-700')
    expect(currentButton.exists()).toBe(true)
    expect(currentButton.text()).toBe(`${currentRound.distance}m`)
  })

  it('emits update:selectedIndex event when a round is clicked', async () => {
    const buttons = wrapper.findAll('button')
    await buttons[1].trigger('click')
    expect(wrapper.emitted('update:selectedIndex')).toBeTruthy()
    expect(wrapper.emitted('update:selectedIndex')![0]).toEqual([1])
  })
})
