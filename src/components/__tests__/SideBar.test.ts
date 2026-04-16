import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SideBar from '../SideBar.vue'
import { mockThemeConfig, mockRoute, sampleSidebar } from '../../__tests__/helpers'

beforeEach(() => {
  mockThemeConfig({ nav: [], sidebar: sampleSidebar })
  mockRoute('/')
})

describe('SideBar', () => {
  it('renders groups from config with correct count and text', () => {
    const wrapper = mount(SideBar)

    const groups = wrapper.findAll('.sidebar-group')
    expect(groups).toHaveLength(sampleSidebar.length)
    sampleSidebar.forEach((group, i) => {
      expect(groups[i].find('.sidebar-group-title').text()).toContain(group.text)
    })
  })

  it('all groups start open (all sidebar-link elements visible)', () => {
    const wrapper = mount(SideBar)

    const linkContainers = wrapper.findAll('.sidebar-group-items')
    linkContainers.forEach(container => {
      expect(container.isVisible()).toBe(true)
    })
  })

  it('toggle collapses a group when title is clicked', async () => {
    const wrapper = mount(SideBar)

    // Click the first group title to collapse it
    await wrapper.findAll('.sidebar-group-title')[0].trigger('click')

    const firstGroupItems = wrapper.findAll('.sidebar-group-items')[0]
    expect(firstGroupItems.isVisible()).toBe(false)

    // Second group should still be open
    const secondGroupItems = wrapper.findAll('.sidebar-group-items')[1]
    expect(secondGroupItems.isVisible()).toBe(true)
  })

  it('active link gets .active class when route matches', () => {
    mockRoute('/guide/intro')
    const wrapper = mount(SideBar)

    const activeLinks = wrapper.findAll('.sidebar-link.active')
    expect(activeLinks).toHaveLength(1)
    expect(activeLinks[0].text()).toBe('Introduction')
  })

  it('active link matches route with .html suffix', () => {
    mockRoute('/guide/intro.html')
    const wrapper = mount(SideBar)

    const activeLinks = wrapper.findAll('.sidebar-link.active')
    expect(activeLinks).toHaveLength(1)
    expect(activeLinks[0].text()).toBe('Introduction')
  })

  it('matches snapshot', () => {
    mockRoute('/guide/intro')
    const wrapper = mount(SideBar)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
