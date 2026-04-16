<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const activeId = ref('')
const headers = ref<{ id: string; text: string; level: number }[]>([])

function updateHeaders() {
  const headingEls = document.querySelectorAll('.doc-content h2, .doc-content h3')
  headers.value = Array.from(headingEls).map(el => ({
    id: el.id,
    text: el.textContent?.replace(/\u200B/g, '').trim() || '',
    level: Number(el.tagName[1]),
  }))
}

let observer: IntersectionObserver | null = null

function setupObserver() {
  if (observer) observer.disconnect()

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      }
    },
    { rootMargin: '-80px 0px -70% 0px' }
  )

  document.querySelectorAll('.doc-content h2, .doc-content h3').forEach(el => {
    observer!.observe(el)
  })
}

onMounted(() => {
  updateHeaders()
  setupObserver()
})

watch(() => route.path, () => {
  setTimeout(() => {
    updateHeaders()
    setupObserver()
  }, 100)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <aside v-if="headers.length > 0" class="toc">
    <div class="toc-title">On this page</div>
    <nav class="toc-nav">
      <a
        v-for="header in headers"
        :key="header.id"
        :href="'#' + header.id"
        class="toc-link"
        :class="{
          active: activeId === header.id,
          'toc-h3': header.level === 3,
        }"
      >
        {{ header.text }}
      </a>
    </nav>
  </aside>
</template>

<style scoped>
.toc {
  position: sticky;
  top: calc(var(--nav-height) + 40px);
  padding: 0;
  max-height: calc(100vh - var(--nav-height) - 80px);
  overflow-y: auto;
  align-self: start;
}

.toc-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.toc-link {
  display: block;
  padding: 6px 8px 6px 12px;
  margin: 1px 0;
  border-left: 2px solid transparent;
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s, border-color 0.2s;
}

.toc-link:hover {
  color: var(--text-primary);
  text-decoration: none;
}

.toc-link.active {
  color: var(--accent-primary);
  border-left-color: var(--accent-primary);
}

.toc-h3 {
  padding-left: 24px;
}

@media (max-width: 1280px) {
  .toc {
    display: none;
  }
}
</style>
