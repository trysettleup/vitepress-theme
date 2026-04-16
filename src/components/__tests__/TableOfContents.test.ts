import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TableOfContents from '../TableOfContents.vue'

// jsdom does not implement IntersectionObserver — provide a minimal stub
beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
      constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
    },
  )
})

describe('TableOfContents', () => {
  it('nothing rendered when no headings in DOM (.toc does not exist)', () => {
    // No .doc-content headings in the jsdom environment by default
    const wrapper = mount(TableOfContents)

    expect(wrapper.find('.toc').exists()).toBe(false)
  })

  it('matches snapshot', () => {
    const wrapper = mount(TableOfContents)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
