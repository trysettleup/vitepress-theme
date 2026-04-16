import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../Footer.vue'
import { mockThemeConfig } from '../../__tests__/helpers'

describe('Footer', () => {
  it('hidden when no footer config', () => {
    mockThemeConfig({ nav: [], sidebar: [] })
    const wrapper = mount(Footer)

    expect(wrapper.find('.site-footer').exists()).toBe(false)
  })

  it('renders footer text', () => {
    mockThemeConfig({
      nav: [],
      sidebar: [],
      footer: { text: '© 2024 My Company' },
    })
    const wrapper = mount(Footer)

    expect(wrapper.find('.site-footer').exists()).toBe(true)
    expect(wrapper.find('.footer-left').text()).toBe('© 2024 My Company')
  })

  it('renders links with correct count and text', () => {
    mockThemeConfig({
      nav: [],
      sidebar: [],
      footer: {
        links: [
          { text: 'Privacy', link: '/privacy' },
          { text: 'Terms', link: '/terms' },
          { text: 'GitHub', link: 'https://github.com/example' },
        ],
      },
    })
    const wrapper = mount(Footer)

    const links = wrapper.findAll('.footer-right a')
    expect(links).toHaveLength(3)
    expect(links[0].text()).toBe('Privacy')
    expect(links[1].text()).toBe('Terms')
    expect(links[2].text()).toBe('GitHub')
  })

  it('external links get target="_blank" and rel="noopener"', () => {
    mockThemeConfig({
      nav: [],
      sidebar: [],
      footer: {
        links: [
          { text: 'GitHub', link: 'https://github.com/example' },
        ],
      },
    })
    const wrapper = mount(Footer)

    const link = wrapper.find('.footer-right a')
    expect(link.attributes('target')).toBe('_blank')
    expect(link.attributes('rel')).toBe('noopener')
  })

  it('internal links have no target', () => {
    mockThemeConfig({
      nav: [],
      sidebar: [],
      footer: {
        links: [
          { text: 'Privacy', link: '/privacy' },
        ],
      },
    })
    const wrapper = mount(Footer)

    const link = wrapper.find('.footer-right a')
    expect(link.attributes('target')).toBeUndefined()
  })

  it('renders N-1 dot separators for N links', () => {
    const links = [
      { text: 'Privacy', link: '/privacy' },
      { text: 'Terms', link: '/terms' },
      { text: 'GitHub', link: 'https://github.com/example' },
    ]
    mockThemeConfig({
      nav: [],
      sidebar: [],
      footer: { links },
    })
    const wrapper = mount(Footer)

    const seps = wrapper.findAll('.footer-sep')
    expect(seps).toHaveLength(links.length - 1)
  })

  it('matches snapshot', () => {
    mockThemeConfig({
      nav: [],
      sidebar: [],
      footer: {
        text: '© 2024 My Company',
        links: [
          { text: 'Privacy', link: '/privacy' },
          { text: 'GitHub', link: 'https://github.com/example' },
        ],
      },
    })
    const wrapper = mount(Footer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
