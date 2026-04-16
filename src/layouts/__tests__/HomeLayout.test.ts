import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import HomeLayout from '../HomeLayout.vue'
import { mockThemeConfig } from '../../__tests__/helpers'

describe('HomeLayout', () => {
  beforeEach(() => {
    mockThemeConfig({})
  })

  it('renders NavBar component', () => {
    const wrapper = shallowMount(HomeLayout)
    const navBar = wrapper.findComponent({ name: 'NavBar' })
    expect(navBar.exists()).toBe(true)
  })

  it('renders Footer component', () => {
    const wrapper = shallowMount(HomeLayout)
    const footer = wrapper.findComponent({ name: 'Footer' })
    expect(footer.exists()).toBe(true)
  })

  it('renders MobileNav component', () => {
    const wrapper = shallowMount(HomeLayout)
    const mobileNav = wrapper.findComponent({ name: 'MobileNav' })
    expect(mobileNav.exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = shallowMount(HomeLayout)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
