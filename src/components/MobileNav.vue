<script setup lang="ts">
import { useData } from 'vitepress'
import type { ThemeConfig } from '../config'

const { theme } = useData<ThemeConfig>()

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="mobile-overlay" @click="emit('close')"></div>
    </Transition>
    <Transition name="slide">
      <nav v-if="open" class="mobile-nav">
        <div class="mobile-nav-header">
          <span class="mobile-nav-title">Navigation</span>
          <button class="mobile-nav-close" @click="emit('close')" aria-label="Close navigation">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="mobile-nav-body">
          <div v-for="group in theme.sidebar" :key="group.text" class="mobile-nav-group">
            <div class="mobile-nav-group-title">{{ group.text }}</div>
            <a
              v-for="item in group.items"
              :key="item.link"
              :href="item.link"
              class="mobile-nav-link"
              @click="emit('close')"
            >
              {{ item.text }}
            </a>
          </div>
        </div>
      </nav>
    </Transition>
  </Teleport>
</template>

<style scoped>
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background-color: rgba(0, 0, 0, 0.5);
}

.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 201;
  width: 280px;
  background-color: var(--bg-elevated);
  overflow-y: auto;
}

.mobile-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid var(--bg-surface);
}

.mobile-nav-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.mobile-nav-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
}

.mobile-nav-close:hover {
  color: var(--text-primary);
}

.mobile-nav-body {
  padding: 16px 0;
}

.mobile-nav-group {
  padding: 0 20px;
  margin-bottom: 20px;
}

.mobile-nav-group-title {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.mobile-nav-link {
  display: block;
  padding: 6px 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
}

.mobile-nav-link:hover {
  color: var(--accent-primary);
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
