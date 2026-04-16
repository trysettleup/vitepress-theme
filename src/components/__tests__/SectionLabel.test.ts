import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SectionLabel from '../SectionLabel.vue'
import { mockThemeConfig, mockRoute, sampleSidebar } from '../../__tests__/helpers'

beforeEach(() => {
  mockThemeConfig({ nav: [], sidebar: sampleSidebar })
})

describe('SectionLabel', () => {
  it('route /guide/intro renders label "Guide"', () => {
    mockRoute('/guide/intro')
    const wrapper = mount(SectionLabel)

    expect(wrapper.find('.section-label').exists()).toBe(true)
    expect(wrapper.find('.section-label').text()).toBe('Guide')
  })

  it('route /reference/api renders label "Reference"', () => {
    mockRoute('/reference/api')
    const wrapper = mount(SectionLabel)

    expect(wrapper.find('.section-label').exists()).toBe(true)
    expect(wrapper.find('.section-label').text()).toBe('Reference')
  })

  it('route with .html suffix matches', () => {
    mockRoute('/guide/intro.html')
    const wrapper = mount(SectionLabel)

    expect(wrapper.find('.section-label').exists()).toBe(true)
    expect(wrapper.find('.section-label').text()).toBe('Guide')
  })

  it('unknown route is hidden', () => {
    mockRoute('/unknown/page')
    const wrapper = mount(SectionLabel)

    expect(wrapper.find('.section-label').exists()).toBe(false)
  })

  it('matches snapshot', () => {
    mockRoute('/guide/intro')
    const wrapper = mount(SectionLabel)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
