import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ArchitectureFlow from '../ArchitectureFlow.vue'

const sampleSteps = [
  { icon: '📥', title: 'Input', subtitle: 'Receive data' },
  { icon: '⚙️', title: 'Process', subtitle: 'Transform data' },
  { icon: '📤', title: 'Output', subtitle: 'Send results' },
]

describe('ArchitectureFlow', () => {
  it('hides label when omitted', () => {
    const wrapper = mount(ArchitectureFlow, {
      props: { heading: 'Architecture', steps: sampleSteps },
    })
    expect(wrapper.find('.section-label').exists()).toBe(false)
  })

  it('shows label when provided', () => {
    const wrapper = mount(ArchitectureFlow, {
      props: { label: 'How It Works', heading: 'Architecture', steps: sampleSteps },
    })
    const label = wrapper.find('.section-label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('How It Works')
  })

  it('hides subtitle when omitted', () => {
    const wrapper = mount(ArchitectureFlow, {
      props: { heading: 'Architecture', steps: sampleSteps },
    })
    expect(wrapper.find('.arch-subtitle').exists()).toBe(false)
  })

  it('shows subtitle when provided', () => {
    const wrapper = mount(ArchitectureFlow, {
      props: {
        heading: 'Architecture',
        subtitle: 'Simple and powerful',
        steps: sampleSteps,
      },
    })
    const subtitle = wrapper.find('.arch-subtitle')
    expect(subtitle.exists()).toBe(true)
    expect(subtitle.text()).toBe('Simple and powerful')
  })

  it('renders correct number of .arch-node elements', () => {
    const wrapper = mount(ArchitectureFlow, {
      props: { heading: 'Architecture', steps: sampleSteps },
    })
    expect(wrapper.findAll('.arch-node')).toHaveLength(sampleSteps.length)
  })

  it('renders N-1 .arch-arrow SVGs for N steps', () => {
    const wrapper = mount(ArchitectureFlow, {
      props: { heading: 'Architecture', steps: sampleSteps },
    })
    expect(wrapper.findAll('.arch-arrow')).toHaveLength(sampleSteps.length - 1)
  })

  it('each node has .arch-icon, h4, and p', () => {
    const wrapper = mount(ArchitectureFlow, {
      props: { heading: 'Architecture', steps: sampleSteps },
    })
    const nodes = wrapper.findAll('.arch-node')
    nodes.forEach((node, i) => {
      expect(node.find('.arch-icon').exists()).toBe(true)
      expect(node.find('h4').exists()).toBe(true)
      expect(node.find('p').exists()).toBe(true)
      expect(node.find('h4').text()).toBe(sampleSteps[i].title)
      expect(node.find('p').text()).toBe(sampleSteps[i].subtitle)
    })
  })

  it('renders heading via v-html with gradient-text span', () => {
    const wrapper = mount(ArchitectureFlow, {
      props: {
        heading: '<span class="gradient-text">Flow</span> Architecture',
        steps: sampleSteps,
      },
    })
    expect(wrapper.find('.gradient-text').exists()).toBe(true)
    expect(wrapper.find('.gradient-text').text()).toBe('Flow')
  })

  it('matches snapshot', () => {
    const wrapper = mount(ArchitectureFlow, {
      props: {
        label: 'How It Works',
        heading: '<span class="gradient-text">Flow</span> Architecture',
        subtitle: 'Simple and powerful',
        steps: sampleSteps,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
