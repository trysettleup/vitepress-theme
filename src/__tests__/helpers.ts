import { ref } from 'vue'
import { vi } from 'vitest'
import { useData, useRoute } from 'vitepress'
import type { ThemeConfig } from '../config'

export function mockThemeConfig(overrides: Partial<ThemeConfig> = {}) {
  const config: ThemeConfig = {
    nav: [],
    sidebar: [],
    ...overrides,
  }
  vi.mocked(useData).mockReturnValue({
    theme: ref(config),
    frontmatter: ref({}),
    site: ref({ title: 'Test' }),
  } as any)
  return config
}

export function mockRoute(path: string) {
  vi.mocked(useRoute).mockReturnValue({ path } as any)
}

export const sampleSidebar = [
  {
    text: 'Guide',
    items: [
      { text: 'Introduction', link: '/guide/intro' },
      { text: 'Getting Started', link: '/guide/start' },
    ],
  },
  {
    text: 'Reference',
    items: [
      { text: 'API', link: '/reference/api' },
      { text: 'Config', link: '/reference/config' },
    ],
  },
]

export const sampleNav = [
  { text: 'Guide', link: '/guide/intro' },
  { text: 'Reference', link: '/reference/api' },
]
