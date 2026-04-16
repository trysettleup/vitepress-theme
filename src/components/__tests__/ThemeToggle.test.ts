import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeToggle from '../ThemeToggle.vue'

beforeEach(() => {
  document.documentElement.classList.remove('dark')
  localStorage.clear()
})

describe('ThemeToggle', () => {
  it('renders a .theme-toggle button', () => {
    const wrapper = mount(ThemeToggle)

    expect(wrapper.find('.theme-toggle').exists()).toBe(true)
    expect(wrapper.find('.theme-toggle').element.tagName).toBe('BUTTON')
  })

  it('contains an SVG icon', () => {
    const wrapper = mount(ThemeToggle)

    expect(wrapper.find('.theme-toggle svg').exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = mount(ThemeToggle)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
