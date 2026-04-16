<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import type { ThemeConfig } from '../config'

const { theme } = useData<ThemeConfig>()
const route = useRoute()

const sectionLabel = computed(() => {
  const path = route.path
  const group = theme.value.sidebar.find(g =>
    g.items.some(item => path === item.link || path === item.link + '.html')
  )
  return group?.text || ''
})
</script>

<template>
  <div v-if="sectionLabel" class="section-label">{{ sectionLabel }}</div>
</template>

<style scoped>
.section-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent-primary);
  margin-bottom: 8px;
}
</style>
