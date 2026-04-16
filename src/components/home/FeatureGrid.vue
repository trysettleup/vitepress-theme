<script setup lang="ts">
interface FeatureItem {
  icon: string
  title: string
  description: string
}

defineProps<{
  label?: string
  heading: string
  items: FeatureItem[]
}>()
</script>

<template>
  <section class="features-section">
    <div class="features-bg"></div>
    <div class="features-inner">
      <span v-if="label" class="section-label">{{ label }}</span>
      <h2 class="section-heading" v-html="heading"></h2>
      <div class="features-grid">
        <div v-for="item in items" :key="item.title" class="feature-card">
          <div class="feature-icon">{{ item.icon }}</div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </div>
    </div>
    <div class="glow-divider"></div>
  </section>
</template>

<style scoped>
.features-section {
  position: relative;
  padding: 100px 0;
  background-color: var(--bg-elevated);
}

.features-bg {
  display: none;
}

.features-inner {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
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

.section-heading {
  text-align: center;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 36px;
}

:deep(.gradient-text) {
  background: linear-gradient(135deg, #0EA5E9, #06B6D4, #38BDF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.feature-card {
  padding: 28px;
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  backdrop-filter: blur(8px);
  transition: border-color 0.3s;
}

:root:not(.dark) .feature-card {
  background-color: rgba(255, 255, 255, 0.7);
  border-color: rgba(0, 0, 0, 0.06);
}

.feature-card:hover {
  border-color: var(--accent-primary);
}

.feature-icon {
  font-size: 1.5rem;
  margin-bottom: 12px;
}

.feature-card h3 {
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.feature-card p {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.glow-divider {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: var(--bg-surface);
}

@media (max-width: 768px) {
  .features-section {
    padding: 60px 0;
  }

  .features-inner {
    padding: 0 24px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
