import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import PrevNext from '../PrevNext.vue'
import { mockThemeConfig, mockRoute, sampleSidebar } from '../../__tests__/helpers'

// sampleSidebar pages in order:
// 0: /guide/intro      (Introduction)
// 1: /guide/start      (Getting Started)
// 2: /reference/api    (API)
// 3: /reference/config (Config)

beforeEach(() => {
  mockThemeConfig({ nav: [], sidebar: sampleSidebar })
})

describe('PrevNext', () => {
  it('first page (/guide/intro): no .prev, has .next with "Getting Started"', () => {
    mockRoute('/guide/intro')
    const wrapper = mount(PrevNext)

    expect(wrapper.find('.prev').exists()).toBe(false)
    const next = wrapper.find('.next')
    expect(next.exists()).toBe(true)
    expect(next.find('.prev-next-title').text()).toBe('Getting Started')
  })

  it('last page (/reference/config): has .prev with "API", no .next', () => {
    mockRoute('/reference/config')
    const wrapper = mount(PrevNext)

    const prev = wrapper.find('.prev')
    expect(prev.exists()).toBe(true)
    expect(prev.find('.prev-next-title').text()).toBe('API')
    expect(wrapper.find('.next').exists()).toBe(false)
  })

  it('middle page (/guide/start): both prev and next with correct text', () => {
    mockRoute('/guide/start')
    const wrapper = mount(PrevNext)

    const prev = wrapper.find('.prev')
    expect(prev.exists()).toBe(true)
    expect(prev.find('.prev-next-title').text()).toBe('Introduction')

    const next = wrapper.find('.next')
    expect(next.exists()).toBe(true)
    expect(next.find('.prev-next-title').text()).toBe('API')
  })

  it('unknown route: no .prev link (currentIndex is -1, so prev is null)', () => {
    mockRoute('/unknown/page')
    const wrapper = mount(PrevNext)

    // currentIndex is -1 for unknown routes; prev condition (> 0) is false so no .prev link
    expect(wrapper.find('.prev').exists()).toBe(false)
  })

  it('route with .html suffix matches', () => {
    mockRoute('/guide/intro.html')
    const wrapper = mount(PrevNext)

    expect(wrapper.find('.prev').exists()).toBe(false)
    expect(wrapper.find('.next').exists()).toBe(true)
    expect(wrapper.find('.next .prev-next-title').text()).toBe('Getting Started')
  })

  it('matches snapshot', () => {
    mockRoute('/guide/start')
    const wrapper = mount(PrevNext)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
