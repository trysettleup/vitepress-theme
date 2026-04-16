<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import MobileNav from '../components/MobileNav.vue'
import SideBar from '../components/SideBar.vue'
import TableOfContents from '../components/TableOfContents.vue'
import PrevNext from '../components/PrevNext.vue'
import SectionLabel from '../components/SectionLabel.vue'

const mobileOpen = ref(false)
</script>

<template>
  <div class="doc-layout">
    <NavBar :show-mobile-toggle="true" @toggle-mobile="mobileOpen = !mobileOpen" />
    <MobileNav :open="mobileOpen" @close="mobileOpen = false" />

    <div class="doc-container">
      <div class="doc-body">
        <SideBar />
        <main class="doc-main">
          <div class="doc-content">
            <SectionLabel />
            <Content />
            <PrevNext />
          </div>
        </main>
        <TableOfContents />
      </div>
    </div>
  </div>
</template>

<style scoped>
.doc-layout {
  min-height: 100vh;
  background-color: var(--bg-base);
  position: relative;
}

.doc-layout::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: calc((100vw - 1400px) / 2 + var(--sidebar-width) + 24px);
  background-color: var(--sidebar-panel-bg);
  z-index: 0;
  border-right: 1px solid var(--sidebar-panel-border);
}

@media (max-width: 1448px) {
  .doc-layout::before {
    width: calc(var(--sidebar-width) + 24px);
  }
}

@media (max-width: 960px) {
  .doc-layout::before {
    display: none;
  }
}

.doc-container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

.doc-body {
  display: grid;
  grid-template-columns: var(--sidebar-width) 1fr var(--toc-width);
  gap: 0;
}

.doc-main {
  min-width: 0;
  padding: 40px 48px;
}

.doc-content {
  max-width: 800px;
}

@media (max-width: 1280px) {
  .doc-body {
    grid-template-columns: var(--sidebar-width) 1fr;
  }
}

@media (max-width: 960px) {
  .doc-body {
    grid-template-columns: 1fr;
  }

  .doc-main {
    padding: 24px;
  }
}
</style>
