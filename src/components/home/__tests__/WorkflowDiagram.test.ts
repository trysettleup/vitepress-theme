import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { vi } from 'vitest'
import WorkflowDiagram from '../WorkflowDiagram.vue'

describe('WorkflowDiagram', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('uses default steps when no prop — 5 .diagram-node elements', () => {
    const wrapper = mount(WorkflowDiagram)
    expect(wrapper.findAll('.diagram-node')).toHaveLength(5)
  })

  it('default steps: first is "Dispatch" and last is "Complete"', () => {
    const wrapper = mount(WorkflowDiagram)
    const nodes = wrapper.findAll('.diagram-node')
    expect(nodes[0].text()).toBe('Dispatch')
    expect(nodes[nodes.length - 1].text()).toBe('Complete')
  })

  it('uses custom steps when provided', () => {
    const steps = [
      { label: 'Start', color: '#ff0000' },
      { label: 'Middle', color: '#00ff00' },
      { label: 'End', color: '#0000ff' },
    ]
    const wrapper = mount(WorkflowDiagram, { props: { steps } })
    const nodes = wrapper.findAll('.diagram-node')
    expect(nodes).toHaveLength(3)
    expect(nodes[0].text()).toBe('Start')
    expect(nodes[1].text()).toBe('Middle')
    expect(nodes[2].text()).toBe('End')
  })

  it('first node starts with .active class', () => {
    const wrapper = mount(WorkflowDiagram)
    const nodes = wrapper.findAll('.diagram-node')
    expect(nodes[0].classes()).toContain('active')
  })

  it('active index advances after a 2400ms timer tick', async () => {
    const wrapper = mount(WorkflowDiagram)
    const nodesBefore = wrapper.findAll('.diagram-node')
    expect(nodesBefore[0].classes()).toContain('active')
    expect(nodesBefore[1].classes()).not.toContain('active')

    vi.advanceTimersByTime(2400)
    await wrapper.vm.$nextTick()

    const nodesAfter = wrapper.findAll('.diagram-node')
    expect(nodesAfter[0].classes()).not.toContain('active')
    expect(nodesAfter[1].classes()).toContain('active')
  })

  it('renders N-1 .diagram-arrow SVGs for N nodes', () => {
    const steps = [
      { label: 'A' },
      { label: 'B' },
      { label: 'C' },
      { label: 'D' },
    ]
    const wrapper = mount(WorkflowDiagram, { props: { steps } })
    expect(wrapper.findAll('.diagram-arrow')).toHaveLength(steps.length - 1)
  })

  it('matches snapshot', () => {
    const steps = [
      { label: 'Start', color: '#0EA5E9' },
      { label: 'Process', color: '#6366F1' },
      { label: 'End', color: '#10B981' },
    ]
    const wrapper = mount(WorkflowDiagram, { props: { steps } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
