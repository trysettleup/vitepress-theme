import { vi } from 'vitest'

vi.mock('vitepress', () => ({
  useData: vi.fn(() => ({
    theme: { value: {} },
    frontmatter: { value: {} },
    site: { value: { title: 'Test' } },
  })),
  useRoute: vi.fn(() => ({ path: '/' })),
  Content: {
    name: 'Content',
    render() { return null },
  },
}))
