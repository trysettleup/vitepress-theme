<script setup lang="ts">
import { ref } from 'vue'
import NavBar from '../components/NavBar.vue'
import MobileNav from '../components/MobileNav.vue'
import Footer from '../components/Footer.vue'

const mobileOpen = ref(false)
</script>

<template>
  <div class="home-layout">
    <NavBar :show-mobile-toggle="true" @toggle-mobile="mobileOpen = !mobileOpen" />
    <MobileNav :open="mobileOpen" @close="mobileOpen = false" />
    <main>
      <Content />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.home-layout {
  min-height: 100vh;
  background-color: var(--bg-base);
}
</style>
