<script setup lang="ts">
import { ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import type { ThemeConfig } from '../config'

const { theme } = useData<ThemeConfig>()
const route = useRoute()

const openGroups = ref<Set<string>>(new Set(theme.value.sidebar.map(g => g.text)))

function toggleGroup(text: string) {
  if (openGroups.value.has(text)) {
    openGroups.value.delete(text)
  } else {
    openGroups.value.add(text)
  }
}

function isActive(link: string): boolean {
  return route.path === link || route.path === link + '.html'
}
</script>

<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <div v-for="group in theme.sidebar" :key="group.text" class="sidebar-group">
        <button class="sidebar-group-title" @click="toggleGroup(group.text)">
          <span>{{ group.text }}</span>
          <svg
            class="sidebar-chevron"
            :class="{ open: openGroups.has(group.text) }"
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
        <div v-show="openGroups.has(group.text)" class="sidebar-group-items">
          <a
            v-for="item in group.items"
            :key="item.link"
            :href="item.link"
            class="sidebar-link"
            :class="{ active: isActive(item.link) }"
          >
            {{ item.text }}
          </a>
        </div>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  padding: 20px 0;
}

.sidebar-nav {
  padding: 0 12px;
}

.sidebar-group {
  margin-bottom: 4px;
}

.sidebar-group-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 8px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0;
  color: var(--text-primary);
  cursor: pointer;
  transition: color 0.2s;
}

.sidebar-group-title:hover {
  color: var(--text-secondary);
}

.sidebar-chevron {
  transition: transform 0.2s;
}

.sidebar-chevron.open {
  transform: rotate(90deg);
}

.sidebar-group-items {
  padding: 2px 0 8px;
}

.sidebar-link {
  display: block;
  padding: 6px 8px 6px 12px;
  margin: 1px 0;
  border-left: 2px solid transparent;
  border-radius: 0 6px 6px 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

.sidebar-link:hover {
  color: var(--text-primary);
  text-decoration: none;
}

.sidebar-link.active {
  color: var(--accent-primary);
  border-left-color: var(--accent-primary);
}

@media (max-width: 960px) {
  .sidebar {
    display: none;
  }
}
</style>
