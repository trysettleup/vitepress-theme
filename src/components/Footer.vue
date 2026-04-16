<script setup lang="ts">
import { useData } from 'vitepress'
import type { ThemeConfig } from '../config'

const { theme } = useData<ThemeConfig>()

function isExternal(link: string): boolean {
  return link.startsWith('http')
}
</script>

<template>
  <footer v-if="theme.footer" class="site-footer">
    <div class="footer-inner">
      <div v-if="theme.footer.text" class="footer-left">
        {{ theme.footer.text }}
      </div>
      <div v-if="theme.footer.links && theme.footer.links.length" class="footer-right">
        <template v-for="(link, index) in theme.footer.links" :key="link.link">
          <span v-if="index > 0" class="footer-sep">&middot;</span>
          <a
            :href="link.link"
            v-bind="isExternal(link.link) ? { target: '_blank', rel: 'noopener' } : {}"
          >{{ link.text }}</a>
        </template>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  border-top: 1px solid var(--bg-surface);
  background-color: var(--bg-deep);
}

.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 24px;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-right a {
  color: var(--accent-primary);
  text-decoration: none;
}

.footer-right a:hover {
  text-decoration: underline;
}

.footer-sep {
  color: var(--text-muted);
}

@media (max-width: 640px) {
  .footer-inner {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
</style>
