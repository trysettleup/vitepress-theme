import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FeatureGrid from '../FeatureGrid.vue'

const sampleItems = [
  { icon: '⚡', title: 'Fast', description: 'Blazing fast performance' },
  { icon: '🔒', title: 'Secure', description: 'Enterprise-grade security' },
  { icon: '🎨', title: 'Flexible', description: 'Highly customizable' },
]

describe('FeatureGrid', () => {
  it('hides label when omitted', () => {
    const wrapper = mount(FeatureGrid, {
      props: { heading: 'Features', items: sampleItems },
    })
    expect(wrapper.find('.section-label').exists()).toBe(false)
  })

  it('shows label when provided', () => {
    const wrapper = mount(FeatureGrid, {
      props: { label: 'Why Us', heading: 'Features', items: sampleItems },
    })
    const label = wrapper.find('.section-label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Why Us')
  })

  it('renders heading via v-html with gradient-text span', () => {
    const wrapper = mount(FeatureGrid, {
      props: {
        heading: '<span class="gradient-text">Amazing</span> Features',
        items: sampleItems,
      },
    })
    expect(wrapper.find('.gradient-text').exists()).toBe(true)
    expect(wrapper.find('.gradient-text').text()).toBe('Amazing')
  })

  it('renders correct number of feature-card elements', () => {
    const wrapper = mount(FeatureGrid, {
      props: { heading: 'Features', items: sampleItems },
    })
    expect(wrapper.findAll('.feature-card')).toHaveLength(sampleItems.length)
  })

  it('each card has .feature-icon, h3, and p', () => {
    const wrapper = mount(FeatureGrid, {
      props: { heading: 'Features', items: sampleItems },
    })
    const cards = wrapper.findAll('.feature-card')
    cards.forEach((card, i) => {
      expect(card.find('.feature-icon').exists()).toBe(true)
      expect(card.find('h3').exists()).toBe(true)
      expect(card.find('p').exists()).toBe(true)
      expect(card.find('h3').text()).toBe(sampleItems[i].title)
      expect(card.find('p').text()).toBe(sampleItems[i].description)
    })
  })

  it('matches snapshot', () => {
    const wrapper = mount(FeatureGrid, {
      props: {
        label: 'Features',
        heading: '<span class="gradient-text">Key</span> Features',
        items: sampleItems,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
