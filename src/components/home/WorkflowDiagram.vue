<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface WorkflowStep {
  label: string
  color?: string
}

const props = withDefaults(defineProps<{
  steps?: WorkflowStep[]
}>(), {
  steps: () => [
    { label: 'Dispatch', color: '#0EA5E9' },
    { label: 'Validate', color: '#6366F1' },
    { label: 'Condition', color: '#EAB308' },
    { label: 'Execute', color: '#8B5CF6' },
    { label: 'Complete', color: '#10B981' },
  ]
})

const activeIndex = ref(0)
let interval: ReturnType<typeof setInterval> | null = null

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0, 0, 0'
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
}

onMounted(() => {
  interval = setInterval(() => {
    if (activeIndex.value < props.steps.length - 1) {
      activeIndex.value++
    } else if (interval) {
      clearInterval(interval)
      interval = null
    }
  }, 2400)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="workflow-diagram">
    <template v-for="(step, i) in steps" :key="step.label">
      <div
        class="diagram-node"
        :class="{ active: activeIndex === i }"
        :style="activeIndex === i && step.color ? {
          backgroundColor: step.color,
          borderColor: step.color,
          boxShadow: `0 0 16px rgba(${hexToRgb(step.color)}, 0.4)`
        } : {}"
      >
        <span class="node-label">{{ step.label }}</span>
      </div>
      <svg
        v-if="i < steps.length - 1"
        class="diagram-arrow"
        :class="{ 'arrow-active': activeIndex > i }"
        viewBox="0 0 32 12"
        fill="none"
      >
        <line x1="0" y1="6" x2="24" y2="6" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>
        <polygon points="24,2 32,6 24,10" fill="currentColor"/>
      </svg>
    </template>
  </div>
</template>

<style scoped>
.workflow-diagram {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 20px 24px;
  background-color: var(--dark-elevated);
  border: 1px solid var(--dark-surface);
  border-radius: 12px;
  overflow-x: auto;
  box-shadow: 0 0 40px rgba(14, 165, 233, 0.1), 0 0 80px rgba(99, 102, 241, 0.05);
}

.diagram-node {
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  background-color: transparent;
  border: 2px solid var(--dark-surface);
  color: var(--dark-text-muted);
  transition: background-color 0.4s ease, color 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
}

.diagram-node.active {
  color: #fff;
}

.diagram-arrow {
  width: 32px;
  height: 12px;
  flex-shrink: 0;
  color: var(--dark-surface);
  transition: color 0.4s ease;
}

.diagram-arrow.arrow-active {
  color: var(--dark-text-muted);
}
</style>
