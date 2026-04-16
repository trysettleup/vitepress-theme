import { vi } from 'vitest'

// jsdom does not implement window.matchMedia — provide a minimal stub
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

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
