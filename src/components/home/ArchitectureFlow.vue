<script setup lang="ts">
interface FlowStep {
  icon: string
  title: string
  subtitle: string
}

defineProps<{
  label?: string
  heading: string
  subtitle?: string
  steps: FlowStep[]
}>()
</script>

<template>
  <section class="arch-section">
    <div class="arch-bg"></div>
    <div class="arch-inner">
      <span v-if="label" class="section-label">{{ label }}</span>
      <h2 v-html="heading"></h2>
      <p v-if="subtitle" class="arch-subtitle">{{ subtitle }}</p>
      <div class="arch-flow">
        <div v-for="(step, i) in steps" :key="step.title" class="arch-step">
          <div class="arch-node">
            <div class="arch-icon">{{ step.icon }}</div>
            <h4>{{ step.title }}</h4>
            <p>{{ step.subtitle }}</p>
          </div>
          <svg v-if="i < steps.length - 1" class="arch-arrow" viewBox="0 0 40 16" fill="none">
            <line x1="0" y1="8" x2="30" y2="8" stroke="var(--accent-primary)" stroke-width="2"/>
            <polygon points="30,3 40,8 30,13" fill="var(--accent-primary)"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.arch-section {
  position: relative;
  padding: 100px 0;
  background-color: var(--bg-elevated);
}

.arch-bg {
  display: none;
}

.arch-inner {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
  text-align: center;
}

.section-label {
  display: block;
  text-align: center;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: var(--accent-primary);
  margin-bottom: 8px;
}

.arch-inner h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 6px;
}

:deep(.gradient-text) {
  background: linear-gradient(135deg, #0EA5E9, #06B6D4, #38BDF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.arch-subtitle {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  margin-bottom: 36px;
}

.arch-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
}

.arch-step {
  display: flex;
  align-items: center;
  gap: 16px;
}

.arch-step:not(:last-child) {
  margin-right: 16px;
}

.arch-node {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px 32px;
  text-align: center;
  backdrop-filter: blur(8px);
  transition: border-color 0.3s;
}

:root:not(.dark) .arch-node {
  background-color: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.06);
}

.arch-node:hover {
  border-color: var(--accent-primary);
}

.arch-icon {
  font-size: 1.75rem;
  margin-bottom: 8px;
}

.arch-node h4 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 4px;
}

.arch-node p {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.arch-arrow {
  width: 40px;
  height: 16px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .arch-section {
    padding: 60px 0;
  }

  .arch-inner {
    padding: 0 24px;
  }

  .arch-flow {
    flex-direction: column;
    gap: 12px;
  }

  .arch-step {
    flex-direction: column;
  }

  .arch-arrow {
    transform: rotate(90deg);
  }
}
</style>
