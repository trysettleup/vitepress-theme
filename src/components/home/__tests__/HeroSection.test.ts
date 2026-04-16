import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { vi } from 'vitest'
import HeroSection from '../HeroSection.vue'

const baseProps = {
  title: '<span class="gradient-text">Hello</span> World',
  description: 'The best tool for the job.',
  primaryAction: { text: 'Get Started', link: '/docs/start' },
}

describe('HeroSection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders title via v-html with gradient-text inside .hero-title', () => {
    const wrapper = shallowMount(HeroSection, { props: baseProps })
    const heroTitle = wrapper.find('.hero-title')
    expect(heroTitle.exists()).toBe(true)
    expect(heroTitle.find('.gradient-text').exists()).toBe(true)
    expect(heroTitle.find('.gradient-text').text()).toBe('Hello')
  })

  it('renders description text', () => {
    const wrapper = shallowMount(HeroSection, { props: baseProps })
    expect(wrapper.find('.hero-description').text()).toBe('The best tool for the job.')
  })

  it('primary action link has correct href', () => {
    const wrapper = shallowMount(HeroSection, { props: baseProps })
    const btn = wrapper.find('.btn-primary')
    expect(btn.exists()).toBe(true)
    expect(btn.attributes('href')).toBe('/docs/start')
  })

  it('secondary action hidden when omitted', () => {
    const wrapper = shallowMount(HeroSection, { props: baseProps })
    expect(wrapper.find('.btn-secondary').exists()).toBe(false)
  })

  it('secondary action shown when provided', () => {
    const wrapper = shallowMount(HeroSection, {
      props: {
        ...baseProps,
        secondaryAction: { text: 'Learn More', link: '/docs/about' },
      },
    })
    const btn = wrapper.find('.btn-secondary')
    expect(btn.exists()).toBe(true)
    expect(btn.attributes('href')).toBe('/docs/about')
    expect(btn.text()).toBe('Learn More')
  })

  it('external secondary action gets target="_blank"', () => {
    const wrapper = shallowMount(HeroSection, {
      props: {
        ...baseProps,
        secondaryAction: { text: 'GitHub', link: 'https://github.com/example' },
      },
    })
    const btn = wrapper.find('.btn-secondary')
    expect(btn.attributes('target')).toBe('_blank')
  })

  it('.hero-right hidden when no codeBlock and no showWorkflowDiagram', () => {
    const wrapper = shallowMount(HeroSection, { props: baseProps })
    expect(wrapper.find('.hero-right').exists()).toBe(false)
  })

  it('code block renders filename and html when codeBlock provided', () => {
    const wrapper = shallowMount(HeroSection, {
      props: {
        ...baseProps,
        codeBlock: { filename: 'app.ts', html: '<span class="c-key">const</span> x = 1' },
      },
    })
    expect(wrapper.find('.hero-right').exists()).toBe(true)
    expect(wrapper.find('.code-title').text()).toBe('app.ts')
    const codeBody = wrapper.find('.code-body')
    expect(codeBody.exists()).toBe(true)
    expect(codeBody.html()).toContain('c-key')
  })

  it('WorkflowDiagram stub present when showWorkflowDiagram=true', () => {
    const wrapper = shallowMount(HeroSection, {
      props: {
        ...baseProps,
        showWorkflowDiagram: true,
      },
    })
    expect(wrapper.find('.hero-right').exists()).toBe(true)
    const diagram = wrapper.findComponent({ name: 'WorkflowDiagram' })
    expect(diagram.exists()).toBe(true)
  })

  it('matches snapshot with shallowMount', () => {
    const wrapper = shallowMount(HeroSection, {
      props: {
        ...baseProps,
        secondaryAction: { text: 'Learn More', link: '/docs/about' },
        codeBlock: { filename: 'app.ts', html: '<span>code</span>' },
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
