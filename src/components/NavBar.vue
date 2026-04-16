<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useData } from 'vitepress'
import type { ThemeConfig } from '../config'
import ThemeToggle from './ThemeToggle.vue'

const { theme } = useData<ThemeConfig>()

const isDark = ref(true)

onMounted(() => {
  isDark.value = document.documentElement.classList.contains('dark')
  const observer = new MutationObserver(() => {
    isDark.value = document.documentElement.classList.contains('dark')
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

const logoSrc = computed(() => {
  const logo = theme.value.logo
  if (!logo) return null
  if (typeof logo === 'string') return logo
  return isDark.value ? logo.dark : logo.light
})

defineProps<{
  showMobileToggle?: boolean
}>()

const emit = defineEmits<{
  toggleMobile: []
}>()
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <div class="navbar-left">
        <button
          v-if="showMobileToggle"
          class="mobile-menu-btn"
          aria-label="Toggle sidebar"
          @click="emit('toggleMobile')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
        <a href="/" class="navbar-logo">
          <img v-if="logoSrc" :src="logoSrc" alt="Logo" class="logo-img" />
        </a>
      </div>

      <nav class="navbar-center">
        <a v-for="link in theme.nav" :key="link.link" :href="link.link" class="nav-link">
          {{ link.text }}
        </a>
      </nav>

      <div class="navbar-right">
        <a v-if="theme.github" :href="theme.github" class="nav-github" aria-label="GitHub" target="_blank" rel="noopener">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <ThemeToggle />
        <a v-if="theme.cta" :href="theme.cta.link" class="nav-cta">{{ theme.cta.text }}</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--nav-height);
  background-color: var(--bg-base);
  border-bottom: 1px solid var(--bg-surface);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.navbar-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 32px;
}

.navbar-center {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--text-primary);
  text-decoration: none;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.nav-github {
  display: flex;
  align-items: center;
  color: var(--text-secondary);
  transition: color 0.2s;
}

.nav-github:hover {
  color: var(--accent-primary);
}

.nav-cta {
  padding: 8px 16px;
  border-radius: 8px;
  background-color: var(--accent-primary);
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;
}

.nav-cta:hover {
  opacity: 0.9;
  text-decoration: none;
}

.mobile-menu-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
}

@media (max-width: 768px) {
  .navbar-center {
    display: none;
  }

  .nav-cta {
    display: none;
  }

  .mobile-menu-btn {
    display: flex;
  }
}
</style>
