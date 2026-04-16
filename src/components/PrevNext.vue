<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'
import type { ThemeConfig } from '../config'

const { theme } = useData<ThemeConfig>()
const route = useRoute()

const allPages = computed(() =>
  theme.value.sidebar.flatMap(group => group.items)
)

const currentIndex = computed(() => {
  return allPages.value.findIndex(p => route.path === p.link || route.path === p.link + '.html')
})

const prev = computed(() => {
  return currentIndex.value > 0 ? allPages.value[currentIndex.value - 1] : null
})

const next = computed(() => {
  return currentIndex.value < allPages.value.length - 1 ? allPages.value[currentIndex.value + 1] : null
})
</script>

<template>
  <nav v-if="prev || next" class="prev-next">
    <a v-if="prev" :href="prev.link" class="prev-next-link prev">
      <span class="prev-next-label">&larr; Previous</span>
      <span class="prev-next-title">{{ prev.text }}</span>
    </a>
    <div v-else></div>
    <a v-if="next" :href="next.link" class="prev-next-link next">
      <span class="prev-next-label">Next &rarr;</span>
      <span class="prev-next-title">{{ next.text }}</span>
    </a>
  </nav>
</template>

<style scoped>
.prev-next {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--bg-surface);
}

.prev-next-link {
  display: flex;
  flex-direction: column;
  gap: 4px;
  text-decoration: none;
  transition: color 0.2s;
}

.prev-next-link:hover {
  text-decoration: none;
}

.prev-next-link.next {
  text-align: right;
  margin-left: auto;
}

.prev-next-label {
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.prev-next-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--accent-primary);
}

.prev-next-link:hover .prev-next-title {
  text-decoration: underline;
}
</style>
