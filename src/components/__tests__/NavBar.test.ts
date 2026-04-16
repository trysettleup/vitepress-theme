import { describe, it, expect, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import NavBar from '../NavBar.vue'
import { mockThemeConfig, sampleNav } from '../../__tests__/helpers'

// Stub ThemeToggle so its onMounted hook does not manipulate document.documentElement.classList
const mountOptions = {
  global: {
    stubs: { ThemeToggle: true },
  },
}

beforeEach(() => {
  document.documentElement.classList.remove('dark')
})

describe('NavBar', () => {
  it('renders nav links from config with correct count, text, and href', () => {
    mockThemeConfig({ nav: sampleNav, sidebar: [] })
    const wrapper = mount(NavBar, mountOptions)

    const links = wrapper.findAll('.nav-link')
    expect(links).toHaveLength(sampleNav.length)
    sampleNav.forEach((item, i) => {
      expect(links[i].text()).toBe(item.text)
      expect(links[i].attributes('href')).toBe(item.link)
    })
  })

  it('renders a string logo as img with that src', () => {
    mockThemeConfig({ nav: [], sidebar: [], logo: '/logo.png' })
    const wrapper = mount(NavBar, mountOptions)

    const img = wrapper.find('.logo-img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/logo.png')
  })

  it('picks the dark logo when document.documentElement has the dark class', async () => {
    document.documentElement.classList.add('dark')
    mockThemeConfig({
      nav: [],
      sidebar: [],
      logo: { light: '/logo-light.png', dark: '/logo-dark.png' },
    })
    const wrapper = mount(NavBar, mountOptions)
    await flushPromises()
    await wrapper.vm.$nextTick()

    const img = wrapper.find('.logo-img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/logo-dark.png')
  })

  it('picks the light logo when document.documentElement has no dark class', async () => {
    mockThemeConfig({
      nav: [],
      sidebar: [],
      logo: { light: '/logo-light.png', dark: '/logo-dark.png' },
    })
    const wrapper = mount(NavBar, mountOptions)
    await flushPromises()
    await wrapper.vm.$nextTick()

    const img = wrapper.find('.logo-img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/logo-light.png')
  })

  it('shows the GitHub icon when github is configured', () => {
    mockThemeConfig({ nav: [], sidebar: [], github: 'https://github.com/example/repo' })
    const wrapper = mount(NavBar, mountOptions)

    const githubLink = wrapper.find('.nav-github')
    expect(githubLink.exists()).toBe(true)
    expect(githubLink.attributes('href')).toBe('https://github.com/example/repo')
  })

  it('hides the GitHub icon when github is not configured', () => {
    mockThemeConfig({ nav: [], sidebar: [] })
    const wrapper = mount(NavBar, mountOptions)

    expect(wrapper.find('.nav-github').exists()).toBe(false)
  })

  it('shows the CTA when cta is configured', () => {
    mockThemeConfig({
      nav: [],
      sidebar: [],
      cta: { text: 'Get Started', link: '/getting-started' },
    })
    const wrapper = mount(NavBar, mountOptions)

    const cta = wrapper.find('.nav-cta')
    expect(cta.exists()).toBe(true)
    expect(cta.text()).toBe('Get Started')
    expect(cta.attributes('href')).toBe('/getting-started')
  })

  it('hides the CTA when cta is not configured', () => {
    mockThemeConfig({ nav: [], sidebar: [] })
    const wrapper = mount(NavBar, mountOptions)

    expect(wrapper.find('.nav-cta').exists()).toBe(false)
  })

  it('emits toggleMobile when the hamburger button is clicked', async () => {
    mockThemeConfig({ nav: [], sidebar: [] })
    const wrapper = mount(NavBar, {
      props: { showMobileToggle: true },
      ...mountOptions,
    })

    await wrapper.find('.mobile-menu-btn').trigger('click')

    expect(wrapper.emitted('toggleMobile')).toHaveLength(1)
  })

  it('matches snapshot with full config', () => {
    mockThemeConfig({
      nav: sampleNav,
      sidebar: [],
      logo: '/logo.png',
      github: 'https://github.com/example/repo',
      cta: { text: 'Get Started', link: '/getting-started' },
    })
    const wrapper = mount(NavBar, {
      props: { showMobileToggle: true },
      ...mountOptions,
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
