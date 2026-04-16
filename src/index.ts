import type { Theme } from 'vitepress'
import { h } from 'vue'
import { useData } from 'vitepress'
import HomeLayout from './layouts/HomeLayout.vue'
import DocLayout from './layouts/DocLayout.vue'
import CardGrid from './components/CardGrid.vue'
import Hero from './components/home/HeroSection.vue'
import FeatureGrid from './components/home/FeatureGrid.vue'
import CodeShowcase from './components/home/CodeShowcase.vue'
import ArchitectureFlow from './components/home/ArchitectureFlow.vue'
import './styles/variables.css'
import './styles/base.css'
import './styles/doc.css'
import './styles/code.css'

function Layout() {
  const { frontmatter } = useData()
  if (frontmatter.value.layout === 'home') {
    return h(HomeLayout)
  }
  return h(DocLayout)
}

const theme: Theme = {
  Layout,
  enhanceApp({ app }) {
    app.component('CardGrid', CardGrid)
    app.component('Hero', Hero)
    app.component('FeatureGrid', FeatureGrid)
    app.component('CodeShowcase', CodeShowcase)
    app.component('ArchitectureFlow', ArchitectureFlow)
  },
}

export default theme
