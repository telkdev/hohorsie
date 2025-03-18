import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { BaseButton } from '@/components/button'

describe('BaseButton', () => {
  it('renders text properly', () => {
    const wrapper = mount(BaseButton, { props: { text: 'Click me' } })
    expect(wrapper.text()).toContain('Click me')
  })
  it('emits click event', async () => {
    const wrapper = mount(BaseButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
