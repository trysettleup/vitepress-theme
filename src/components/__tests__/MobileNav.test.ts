import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MobileNav from '../MobileNav.vue'
import { mockThemeConfig, sampleSidebar } from '../../__tests__/helpers'

beforeEach(() => {
  mockThemeConfig({ nav: [], sidebar: sampleSidebar })
})

describe('MobileNav', () => {
  it('hidden when open=false (no .mobile-nav or .mobile-overlay)', () => {
    const wrapper = mount(MobileNav, {
      props: { open: false },
      attachTo: document.body,
    })

    expect(document.querySelector('.mobile-nav')).toBeNull()
    expect(document.querySelector('.mobile-overlay')).toBeNull()

    wrapper.unmount()
  })

  it('shown when open=true', () => {
    const wrapper = mount(MobileNav, {
      props: { open: true },
      attachTo: document.body,
    })

    expect(document.querySelector('.mobile-nav')).not.toBeNull()
    expect(document.querySelector('.mobile-overlay')).not.toBeNull()

    wrapper.unmount()
  })

  it('renders sidebar groups from config', () => {
    const wrapper = mount(MobileNav, {
      props: { open: true },
      attachTo: document.body,
    })

    const groups = document.querySelectorAll('.mobile-nav-group')
    expect(groups).toHaveLength(sampleSidebar.length)
    sampleSidebar.forEach((group, i) => {
      expect(groups[i].querySelector('.mobile-nav-group-title')?.textContent?.trim()).toBe(group.text)
    })

    wrapper.unmount()
  })

  it('overlay click emits close', async () => {
    const wrapper = mount(MobileNav, {
      props: { open: true },
      attachTo: document.body,
    })

    const overlay = document.querySelector('.mobile-overlay') as HTMLElement
    overlay.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('close')).toHaveLength(1)

    wrapper.unmount()
  })

  it('close button emits close', async () => {
    const wrapper = mount(MobileNav, {
      props: { open: true },
      attachTo: document.body,
    })

    const closeBtn = document.querySelector('.mobile-nav-close') as HTMLElement
    closeBtn.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('close')).toHaveLength(1)

    wrapper.unmount()
  })

  it('link click emits close', async () => {
    const wrapper = mount(MobileNav, {
      props: { open: true },
      attachTo: document.body,
    })

    const link = document.querySelector('.mobile-nav-link') as HTMLElement
    link.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('close')).toHaveLength(1)

    wrapper.unmount()
  })

  it('matches snapshot (open state)', () => {
    const wrapper = mount(MobileNav, {
      props: { open: true },
      attachTo: document.body,
    })

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.unmount()
  })
})
