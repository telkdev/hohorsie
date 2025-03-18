import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTable from '@/components/table/BaseTable.vue'

const testHeaders = ['Name', 'Age', 'Breed']
const testRows = [
  ['Thunder', 5, 'Arabian'],
  ['Lightning', 3, 'Thoroughbred'],
  ['Storm', 4, 'Quarter Horse'],
]

let wrapper = makeWrapper()

function makeWrapper(headers = testHeaders, rows = testRows) {
  return mount(BaseTable, {
    props: {
      headers,
      rows,
    },
  })
}

beforeEach(() => {
  wrapper = makeWrapper()
})

describe('BaseTable', () => {
  it('renders table headers correctly', () => {
    const headers = wrapper.findAll('th')
    expect(headers).toHaveLength(testHeaders.length)
    headers.forEach((header, index) => {
      expect(header.text()).toBe(testHeaders[index])
    })
  })

  it('renders table rows correctly', () => {
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(testRows.length)
    rows.forEach((row, rowIndex) => {
      const cells = row.findAll('td')
      expect(cells).toHaveLength(testHeaders.length)
      cells.forEach((cell, cellIndex) => {
        expect(cell.text()).toBe(String(testRows[rowIndex][cellIndex]))
      })
    })
  })

  it('renders custom cell slot content', () => {
    const customWrapper = mount(BaseTable, {
      props: {
        headers: testHeaders,
        rows: testRows,
      },
      slots: {
        cell: `<template #cell="{ cell }"><span class="custom-cell">{{ cell }}</span></template>`,
      },
    })

    const customCells = customWrapper.findAll('.custom-cell')
    expect(customCells).toHaveLength(testRows.length * testHeaders.length)
    customCells.forEach((customCell, index) => {
      const rowIndex = Math.floor(index / testHeaders.length)
      const cellIndex = index % testHeaders.length
      expect(customCell.text()).toBe(String(testRows[rowIndex][cellIndex]))
    })
  })
})
