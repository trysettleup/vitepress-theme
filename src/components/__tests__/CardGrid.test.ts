import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardGrid from '../CardGrid.vue'

describe('CardGrid', () => {
  it('slot content rendered inside .card-grid', () => {
    const wrapper = mount(CardGrid, {
      slots: {
        default: '<a class="card-link" href="/guide">Guide</a>',
      },
    })

    expect(wrapper.find('.card-grid').exists()).toBe(true)
    expect(wrapper.find('.card-grid .card-link').exists()).toBe(true)
    expect(wrapper.find('.card-grid .card-link').text()).toBe('Guide')
  })

  it('matches snapshot', () => {
    const wrapper = mount(CardGrid, {
      slots: {
        default: '<a class="card-link" href="/guide">Guide</a>',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
