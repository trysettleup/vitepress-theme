import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import DocLayout from '../DocLayout.vue'
import { mockThemeConfig, mockRoute, sampleSidebar } from '../../__tests__/helpers'

describe('DocLayout', () => {
  beforeEach(() => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/guide/intro')
  })

  it('renders NavBar component', () => {
    const wrapper = shallowMount(DocLayout)
    const navBar = wrapper.findComponent({ name: 'NavBar' })
    expect(navBar.exists()).toBe(true)
  })

  it('renders SideBar component', () => {
    const wrapper = shallowMount(DocLayout)
    const sidebar = wrapper.findComponent({ name: 'SideBar' })
    expect(sidebar.exists()).toBe(true)
  })

  it('renders TableOfContents component', () => {
    const wrapper = shallowMount(DocLayout)
    const toc = wrapper.findComponent({ name: 'TableOfContents' })
    expect(toc.exists()).toBe(true)
  })

  it('has .doc-body element', () => {
    const wrapper = shallowMount(DocLayout)
    expect(wrapper.find('.doc-body').exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = shallowMount(DocLayout)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
