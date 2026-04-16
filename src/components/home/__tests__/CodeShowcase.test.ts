import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CodeShowcase from '../CodeShowcase.vue'

const sampleCodeBlock = {
  filename: 'example.ts',
  html: '<span class="c-key">const</span> x = 1',
}

describe('CodeShowcase', () => {
  it('hides label when omitted', () => {
    const wrapper = mount(CodeShowcase, {
      props: {
        heading: 'Clean Code',
        description: 'Write clean code easily.',
        codeBlock: sampleCodeBlock,
      },
    })
    expect(wrapper.find('.section-label').exists()).toBe(false)
  })

  it('shows label when provided', () => {
    const wrapper = mount(CodeShowcase, {
      props: {
        label: 'Dev Experience',
        heading: 'Clean Code',
        description: 'Write clean code easily.',
        codeBlock: sampleCodeBlock,
      },
    })
    const label = wrapper.find('.section-label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Dev Experience')
  })

  it('hides action when omitted', () => {
    const wrapper = mount(CodeShowcase, {
      props: {
        heading: 'Clean Code',
        description: 'Write clean code easily.',
        codeBlock: sampleCodeBlock,
      },
    })
    expect(wrapper.find('.showcase-btn').exists()).toBe(false)
  })

  it('shows action with correct href when provided', () => {
    const wrapper = mount(CodeShowcase, {
      props: {
        heading: 'Clean Code',
        description: 'Write clean code easily.',
        action: { text: 'Learn More', link: '/docs/guide' },
        codeBlock: sampleCodeBlock,
      },
    })
    const btn = wrapper.find('.showcase-btn')
    expect(btn.exists()).toBe(true)
    expect(btn.attributes('href')).toBe('/docs/guide')
    expect(btn.text()).toBe('Learn More')
  })

  it('renders code block filename in .code-title', () => {
    const wrapper = mount(CodeShowcase, {
      props: {
        heading: 'Clean Code',
        description: 'Write clean code.',
        codeBlock: sampleCodeBlock,
      },
    })
    expect(wrapper.find('.code-title').text()).toBe('example.ts')
  })

  it('renders code block html inside .code-body code', () => {
    const wrapper = mount(CodeShowcase, {
      props: {
        heading: 'Clean Code',
        description: 'Write clean code.',
        codeBlock: sampleCodeBlock,
      },
    })
    const code = wrapper.find('.code-body code')
    expect(code.exists()).toBe(true)
    expect(code.html()).toContain('c-key')
  })

  it('renders heading via v-html with gradient-text span', () => {
    const wrapper = mount(CodeShowcase, {
      props: {
        heading: '<span class="gradient-text">Clean</span> Code',
        description: 'Write clean code.',
        codeBlock: sampleCodeBlock,
      },
    })
    expect(wrapper.find('.gradient-text').exists()).toBe(true)
    expect(wrapper.find('.gradient-text').text()).toBe('Clean')
  })

  it('matches snapshot', () => {
    const wrapper = mount(CodeShowcase, {
      props: {
        label: 'Dev Experience',
        heading: '<span class="gradient-text">Clean</span> Code',
        description: 'Write clean code easily.',
        action: { text: 'Learn More', link: '/docs/guide' },
        codeBlock: sampleCodeBlock,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
