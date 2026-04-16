# @settleup/vitepress-theme Test Suite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add full test coverage (logic, rendering, snapshots) to the `@settleup/vitepress-theme` package with a GitHub Actions CI workflow.

**Architecture:** Vitest + Vue Test Utils with jsdom. A shared VitePress mock (`useData`, `useRoute`) is used by all config-driven component tests. Props-driven components are tested directly. Every component gets a snapshot test. CI runs on Node 20 and 22.

**Tech Stack:** Vitest, @vue/test-utils, jsdom, GitHub Actions

**Spec:** `docs/superpowers/specs/2026-04-16-test-suite-design.md`

---

## File Map

| File | Responsibility |
|---|---|
| `vitest.config.ts` | Vitest configuration |
| `src/__tests__/setup.ts` | Global VitePress mock |
| `src/__tests__/helpers.ts` | Mock factories for theme config and route |
| `src/__tests__/config.test.ts` | defineThemeConfig tests |
| `src/__tests__/index.test.ts` | Theme entry point tests |
| `src/components/__tests__/NavBar.test.ts` | NavBar component tests |
| `src/components/__tests__/SideBar.test.ts` | SideBar component tests |
| `src/components/__tests__/MobileNav.test.ts` | MobileNav component tests |
| `src/components/__tests__/Footer.test.ts` | Footer component tests |
| `src/components/__tests__/PrevNext.test.ts` | PrevNext component tests |
| `src/components/__tests__/SectionLabel.test.ts` | SectionLabel component tests |
| `src/components/__tests__/ThemeToggle.test.ts` | ThemeToggle component tests |
| `src/components/__tests__/TableOfContents.test.ts` | TableOfContents snapshot |
| `src/components/__tests__/CardGrid.test.ts` | CardGrid component tests |
| `src/components/home/__tests__/HeroSection.test.ts` | HeroSection component tests |
| `src/components/home/__tests__/FeatureGrid.test.ts` | FeatureGrid component tests |
| `src/components/home/__tests__/CodeShowcase.test.ts` | CodeShowcase component tests |
| `src/components/home/__tests__/ArchitectureFlow.test.ts` | ArchitectureFlow component tests |
| `src/components/home/__tests__/WorkflowDiagram.test.ts` | WorkflowDiagram component tests |
| `src/layouts/__tests__/HomeLayout.test.ts` | HomeLayout component tests |
| `src/layouts/__tests__/DocLayout.test.ts` | DocLayout component tests |
| `.github/workflows/test.yml` | CI workflow |

---

## Task 1: Install dependencies and configure Vitest

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/__tests__/setup.ts`
- Create: `src/__tests__/helpers.ts`

- [ ] **Step 1: Install test dependencies**

```bash
cd /Users/aleach/PhpstormProjects/settleup-vitepress-theme
npm install --save-dev vitest @vue/test-utils jsdom @vitejs/plugin-vue
```

- [ ] **Step 2: Add test scripts to package.json**

Add to the `package.json`:

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: Create vitest.config.ts**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
    include: ['src/**/*.test.ts'],
  },
})
```

- [ ] **Step 4: Create setup.ts (global VitePress mock)**

Create `src/__tests__/setup.ts`:

```ts
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
```

- [ ] **Step 5: Create helpers.ts (mock factories)**

Create `src/__tests__/helpers.ts`:

```ts
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
```

- [ ] **Step 6: Verify setup works**

```bash
npx vitest run --passWithNoTests
```

Expected: passes with 0 tests.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "Add Vitest Configuration And Test Helpers"
```

---

## Task 2: Test config.ts and index.ts

**Files:**
- Create: `src/__tests__/config.test.ts`
- Create: `src/__tests__/index.test.ts`

- [ ] **Step 1: Create config.test.ts**

Create `src/__tests__/config.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { defineThemeConfig } from '../config'
import type { ThemeConfig } from '../config'

describe('defineThemeConfig', () => {
  it('returns the same object passed in', () => {
    const config: ThemeConfig = {
      nav: [{ text: 'Guide', link: '/guide' }],
      sidebar: [{ text: 'Intro', items: [{ text: 'Start', link: '/start' }] }],
      github: 'https://github.com/test/test',
      cta: { text: 'Get Started', link: '/start' },
      footer: { text: '© 2026', links: [] },
      logo: '/logo.svg',
    }
    const result = defineThemeConfig(config)
    expect(result).toBe(config)
  })

  it('works with minimal config', () => {
    const config: ThemeConfig = { nav: [], sidebar: [] }
    const result = defineThemeConfig(config)
    expect(result).toEqual({ nav: [], sidebar: [] })
  })
})
```

- [ ] **Step 2: Create index.test.ts**

Create `src/__tests__/index.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import theme from '../index'

describe('theme entry point', () => {
  it('exports a Theme object with Layout and enhanceApp', () => {
    expect(theme).toHaveProperty('Layout')
    expect(theme).toHaveProperty('enhanceApp')
    expect(typeof theme.Layout).toBe('function')
    expect(typeof theme.enhanceApp).toBe('function')
  })

  it('enhanceApp registers all global components', () => {
    const registeredComponents: Record<string, any> = {}
    const mockApp = {
      component(name: string, component: any) {
        registeredComponents[name] = component
      },
    }
    theme.enhanceApp!({ app: mockApp } as any)

    expect(Object.keys(registeredComponents)).toEqual(
      expect.arrayContaining(['CardGrid', 'Hero', 'FeatureGrid', 'CodeShowcase', 'ArchitectureFlow'])
    )
    expect(Object.keys(registeredComponents)).toHaveLength(5)
  })
})
```

- [ ] **Step 3: Run tests**

```bash
npx vitest run
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "Add Tests For Config And Theme Entry Point"
```

---

## Task 3: Test NavBar

**Files:**
- Create: `src/components/__tests__/NavBar.test.ts`

- [ ] **Step 1: Create NavBar.test.ts**

Create `src/components/__tests__/NavBar.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from '../NavBar.vue'
import { mockThemeConfig, sampleNav } from '../../__tests__/helpers'

describe('NavBar', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
  })

  it('renders nav links from config', () => {
    mockThemeConfig({ nav: sampleNav })
    const wrapper = mount(NavBar)
    const links = wrapper.findAll('.nav-link')
    expect(links).toHaveLength(2)
    expect(links[0].text()).toBe('Guide')
    expect(links[0].attributes('href')).toBe('/guide/intro')
    expect(links[1].text()).toBe('Reference')
    expect(links[1].attributes('href')).toBe('/reference/api')
  })

  it('renders string logo as img src', () => {
    mockThemeConfig({ nav: [], logo: '/logo.svg' })
    const wrapper = mount(NavBar)
    const img = wrapper.find('.logo-img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/logo.svg')
  })

  it('picks dark logo when dark mode', async () => {
    document.documentElement.classList.add('dark')
    mockThemeConfig({ nav: [], logo: { light: '/light.svg', dark: '/dark.svg' } })
    const wrapper = mount(NavBar)
    await wrapper.vm.$nextTick()
    const img = wrapper.find('.logo-img')
    expect(img.attributes('src')).toBe('/dark.svg')
  })

  it('picks light logo when light mode', () => {
    mockThemeConfig({ nav: [], logo: { light: '/light.svg', dark: '/dark.svg' } })
    const wrapper = mount(NavBar)
    const img = wrapper.find('.logo-img')
    expect(img.attributes('src')).toBe('/light.svg')
  })

  it('shows GitHub icon when configured', () => {
    mockThemeConfig({ nav: [], github: 'https://github.com/test' })
    const wrapper = mount(NavBar)
    expect(wrapper.find('.nav-github').exists()).toBe(true)
    expect(wrapper.find('.nav-github').attributes('href')).toBe('https://github.com/test')
  })

  it('hides GitHub icon when not configured', () => {
    mockThemeConfig({ nav: [] })
    const wrapper = mount(NavBar)
    expect(wrapper.find('.nav-github').exists()).toBe(false)
  })

  it('shows CTA when configured', () => {
    mockThemeConfig({ nav: [], cta: { text: 'Get Started', link: '/start' } })
    const wrapper = mount(NavBar)
    const cta = wrapper.find('.nav-cta')
    expect(cta.exists()).toBe(true)
    expect(cta.text()).toBe('Get Started')
    expect(cta.attributes('href')).toBe('/start')
  })

  it('hides CTA when not configured', () => {
    mockThemeConfig({ nav: [] })
    const wrapper = mount(NavBar)
    expect(wrapper.find('.nav-cta').exists()).toBe(false)
  })

  it('emits toggleMobile when hamburger clicked', async () => {
    mockThemeConfig({ nav: [] })
    const wrapper = mount(NavBar, { props: { showMobileToggle: true } })
    await wrapper.find('.mobile-menu-btn').trigger('click')
    expect(wrapper.emitted('toggleMobile')).toHaveLength(1)
  })

  it('matches snapshot', () => {
    mockThemeConfig({
      nav: sampleNav,
      logo: '/logo.svg',
      github: 'https://github.com/test',
      cta: { text: 'Start', link: '/start' },
    })
    const wrapper = mount(NavBar, { props: { showMobileToggle: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 2: Run tests**

```bash
npx vitest run src/components/__tests__/NavBar.test.ts
```

Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "Add NavBar Tests"
```

---

## Task 4: Test SideBar, MobileNav, Footer

**Files:**
- Create: `src/components/__tests__/SideBar.test.ts`
- Create: `src/components/__tests__/MobileNav.test.ts`
- Create: `src/components/__tests__/Footer.test.ts`

- [ ] **Step 1: Create SideBar.test.ts**

Create `src/components/__tests__/SideBar.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SideBar from '../SideBar.vue'
import { mockThemeConfig, mockRoute, sampleSidebar } from '../../__tests__/helpers'

describe('SideBar', () => {
  beforeEach(() => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/guide/intro')
  })

  it('renders groups from config', () => {
    const wrapper = mount(SideBar)
    const titles = wrapper.findAll('.sidebar-group-title')
    expect(titles).toHaveLength(2)
    expect(titles[0].text()).toBe('Guide')
    expect(titles[1].text()).toBe('Reference')
  })

  it('all groups start open', () => {
    const wrapper = mount(SideBar)
    const items = wrapper.findAll('.sidebar-link')
    expect(items).toHaveLength(4)
  })

  it('toggle collapses group', async () => {
    const wrapper = mount(SideBar)
    await wrapper.findAll('.sidebar-group-title')[0].trigger('click')
    const visibleLinks = wrapper.findAll('.sidebar-group-items')
    expect(visibleLinks[0].isVisible()).toBe(false)
    expect(visibleLinks[1].isVisible()).toBe(true)
  })

  it('active link gets active class', () => {
    const wrapper = mount(SideBar)
    const activeLink = wrapper.find('.sidebar-link.active')
    expect(activeLink.exists()).toBe(true)
    expect(activeLink.text()).toBe('Introduction')
  })

  it('active link matches route with .html suffix', () => {
    mockRoute('/guide/intro.html')
    const wrapper = mount(SideBar)
    const activeLink = wrapper.find('.sidebar-link.active')
    expect(activeLink.exists()).toBe(true)
    expect(activeLink.text()).toBe('Introduction')
  })

  it('matches snapshot', () => {
    const wrapper = mount(SideBar)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 2: Create MobileNav.test.ts**

Create `src/components/__tests__/MobileNav.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MobileNav from '../MobileNav.vue'
import { mockThemeConfig, sampleSidebar } from '../../__tests__/helpers'

describe('MobileNav', () => {
  beforeEach(() => {
    mockThemeConfig({ sidebar: sampleSidebar })
  })

  it('hidden when open=false', () => {
    const wrapper = mount(MobileNav, { props: { open: false } })
    expect(wrapper.find('.mobile-nav').exists()).toBe(false)
    expect(wrapper.find('.mobile-overlay').exists()).toBe(false)
  })

  it('shown when open=true', () => {
    const wrapper = mount(MobileNav, { props: { open: true } })
    expect(wrapper.find('.mobile-nav').exists()).toBe(true)
    expect(wrapper.find('.mobile-overlay').exists()).toBe(true)
  })

  it('renders sidebar groups', () => {
    const wrapper = mount(MobileNav, { props: { open: true } })
    const groups = wrapper.findAll('.mobile-nav-group-title')
    expect(groups).toHaveLength(2)
    expect(groups[0].text()).toBe('Guide')
  })

  it('overlay click emits close', async () => {
    const wrapper = mount(MobileNav, { props: { open: true } })
    await wrapper.find('.mobile-overlay').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('close button emits close', async () => {
    const wrapper = mount(MobileNav, { props: { open: true } })
    await wrapper.find('.mobile-nav-close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('link click emits close', async () => {
    const wrapper = mount(MobileNav, { props: { open: true } })
    await wrapper.find('.mobile-nav-link').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('matches snapshot', () => {
    const wrapper = mount(MobileNav, { props: { open: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 3: Create Footer.test.ts**

Create `src/components/__tests__/Footer.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../Footer.vue'
import { mockThemeConfig } from '../../__tests__/helpers'

describe('Footer', () => {
  it('hidden when no footer config', () => {
    mockThemeConfig({})
    const wrapper = mount(Footer)
    expect(wrapper.find('.site-footer').exists()).toBe(false)
  })

  it('renders footer text', () => {
    mockThemeConfig({ footer: { text: '© 2026 Test' } })
    const wrapper = mount(Footer)
    expect(wrapper.find('.footer-left').text()).toBe('© 2026 Test')
  })

  it('renders links', () => {
    mockThemeConfig({
      footer: {
        links: [
          { text: 'Docs', link: '/docs' },
          { text: 'GitHub', link: 'https://github.com/test' },
        ],
      },
    })
    const wrapper = mount(Footer)
    const links = wrapper.findAll('.footer-right a')
    expect(links).toHaveLength(2)
    expect(links[0].text()).toBe('Docs')
    expect(links[1].text()).toBe('GitHub')
  })

  it('external links get target _blank', () => {
    mockThemeConfig({
      footer: {
        links: [
          { text: 'Docs', link: '/docs' },
          { text: 'GitHub', link: 'https://github.com/test' },
        ],
      },
    })
    const wrapper = mount(Footer)
    const links = wrapper.findAll('.footer-right a')
    expect(links[0].attributes('target')).toBeUndefined()
    expect(links[1].attributes('target')).toBe('_blank')
    expect(links[1].attributes('rel')).toBe('noopener')
  })

  it('dot separators between links', () => {
    mockThemeConfig({
      footer: {
        links: [
          { text: 'A', link: '/a' },
          { text: 'B', link: '/b' },
          { text: 'C', link: '/c' },
        ],
      },
    })
    const wrapper = mount(Footer)
    const seps = wrapper.findAll('.footer-sep')
    expect(seps).toHaveLength(2)
  })

  it('matches snapshot', () => {
    mockThemeConfig({
      footer: {
        text: '© 2026 Test',
        links: [
          { text: 'Docs', link: '/docs' },
          { text: 'GitHub', link: 'https://github.com/test' },
        ],
      },
    })
    const wrapper = mount(Footer)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 4: Run tests**

```bash
npx vitest run src/components/__tests__/SideBar.test.ts src/components/__tests__/MobileNav.test.ts src/components/__tests__/Footer.test.ts
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "Add SideBar, MobileNav, And Footer Tests"
```

---

## Task 5: Test PrevNext, SectionLabel, and remaining structural components

**Files:**
- Create: `src/components/__tests__/PrevNext.test.ts`
- Create: `src/components/__tests__/SectionLabel.test.ts`
- Create: `src/components/__tests__/ThemeToggle.test.ts`
- Create: `src/components/__tests__/TableOfContents.test.ts`
- Create: `src/components/__tests__/CardGrid.test.ts`

- [ ] **Step 1: Create PrevNext.test.ts**

Create `src/components/__tests__/PrevNext.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PrevNext from '../PrevNext.vue'
import { mockThemeConfig, mockRoute, sampleSidebar } from '../../__tests__/helpers'

describe('PrevNext', () => {
  it('first page: no prev, has next', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/guide/intro')
    const wrapper = mount(PrevNext)
    expect(wrapper.find('.prev').exists()).toBe(false)
    expect(wrapper.find('.next').exists()).toBe(true)
    expect(wrapper.find('.next .prev-next-title').text()).toBe('Getting Started')
  })

  it('last page: has prev, no next', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/reference/config')
    const wrapper = mount(PrevNext)
    expect(wrapper.find('.prev').exists()).toBe(true)
    expect(wrapper.find('.prev .prev-next-title').text()).toBe('API')
    expect(wrapper.find('.next').exists()).toBe(false)
  })

  it('middle page: both shown', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/guide/start')
    const wrapper = mount(PrevNext)
    expect(wrapper.find('.prev').exists()).toBe(true)
    expect(wrapper.find('.prev .prev-next-title').text()).toBe('Introduction')
    expect(wrapper.find('.next').exists()).toBe(true)
    expect(wrapper.find('.next .prev-next-title').text()).toBe('API')
  })

  it('unknown route: nothing rendered', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/unknown')
    const wrapper = mount(PrevNext)
    expect(wrapper.find('.prev-next').exists()).toBe(false)
  })

  it('matches route with .html suffix', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/guide/intro.html')
    const wrapper = mount(PrevNext)
    expect(wrapper.find('.next').exists()).toBe(true)
  })

  it('matches snapshot', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/guide/start')
    const wrapper = mount(PrevNext)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 2: Create SectionLabel.test.ts**

Create `src/components/__tests__/SectionLabel.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SectionLabel from '../SectionLabel.vue'
import { mockThemeConfig, mockRoute, sampleSidebar } from '../../__tests__/helpers'

describe('SectionLabel', () => {
  it('matches route to group name', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/guide/intro')
    const wrapper = mount(SectionLabel)
    expect(wrapper.find('.section-label').text()).toBe('Guide')
  })

  it('matches different group', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/reference/api')
    const wrapper = mount(SectionLabel)
    expect(wrapper.find('.section-label').text()).toBe('Reference')
  })

  it('matches route with .html suffix', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/guide/intro.html')
    const wrapper = mount(SectionLabel)
    expect(wrapper.find('.section-label').text()).toBe('Guide')
  })

  it('hidden for unknown route', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/unknown')
    const wrapper = mount(SectionLabel)
    expect(wrapper.find('.section-label').exists()).toBe(false)
  })

  it('matches snapshot', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/guide/intro')
    const wrapper = mount(SectionLabel)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 3: Create ThemeToggle.test.ts**

Create `src/components/__tests__/ThemeToggle.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ThemeToggle from '../ThemeToggle.vue'

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark')
    localStorage.clear()
  })

  it('renders a button', () => {
    const wrapper = mount(ThemeToggle)
    expect(wrapper.find('.theme-toggle').exists()).toBe(true)
  })

  it('contains an SVG icon', () => {
    const wrapper = mount(ThemeToggle)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = mount(ThemeToggle)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 4: Create TableOfContents.test.ts**

Create `src/components/__tests__/TableOfContents.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TableOfContents from '../TableOfContents.vue'
import { mockRoute } from '../../__tests__/helpers'

describe('TableOfContents', () => {
  it('renders nothing when no headings in DOM', () => {
    mockRoute('/')
    const wrapper = mount(TableOfContents)
    expect(wrapper.find('.toc').exists()).toBe(false)
  })

  it('matches snapshot', () => {
    mockRoute('/')
    const wrapper = mount(TableOfContents)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 5: Create CardGrid.test.ts**

Create `src/components/__tests__/CardGrid.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CardGrid from '../CardGrid.vue'

describe('CardGrid', () => {
  it('renders slot content', () => {
    const wrapper = mount(CardGrid, {
      slots: { default: '<div class="test-card">Card 1</div>' },
    })
    expect(wrapper.find('.card-grid').exists()).toBe(true)
    expect(wrapper.find('.test-card').text()).toBe('Card 1')
  })

  it('matches snapshot', () => {
    const wrapper = mount(CardGrid, {
      slots: { default: '<div>Slot Content</div>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 6: Run tests**

```bash
npx vitest run
```

Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "Add PrevNext, SectionLabel, ThemeToggle, TOC, And CardGrid Tests"
```

---

## Task 6: Test props-driven home page components

**Files:**
- Create: `src/components/home/__tests__/FeatureGrid.test.ts`
- Create: `src/components/home/__tests__/CodeShowcase.test.ts`
- Create: `src/components/home/__tests__/ArchitectureFlow.test.ts`
- Create: `src/components/home/__tests__/WorkflowDiagram.test.ts`
- Create: `src/components/home/__tests__/HeroSection.test.ts`

- [ ] **Step 1: Create FeatureGrid.test.ts**

Create `src/components/home/__tests__/FeatureGrid.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FeatureGrid from '../FeatureGrid.vue'

const items = [
  { icon: '🔀', title: 'Branching', description: 'Dynamic routing' },
  { icon: '📡', title: 'Triggers', description: 'Event-driven' },
  { icon: '🔄', title: 'Retries', description: 'Backoff strategies' },
]

describe('FeatureGrid', () => {
  it('label hidden when omitted', () => {
    const wrapper = mount(FeatureGrid, { props: { heading: 'Test', items } })
    expect(wrapper.find('.section-label').exists()).toBe(false)
  })

  it('label shown when provided', () => {
    const wrapper = mount(FeatureGrid, { props: { label: 'Features', heading: 'Test', items } })
    expect(wrapper.find('.section-label').text()).toBe('Features')
  })

  it('heading rendered via v-html', () => {
    const wrapper = mount(FeatureGrid, {
      props: { heading: 'Built for <span class="gradient-text">power</span>', items },
    })
    expect(wrapper.find('.gradient-text').exists()).toBe(true)
  })

  it('correct number of cards', () => {
    const wrapper = mount(FeatureGrid, { props: { heading: 'Test', items } })
    expect(wrapper.findAll('.feature-card')).toHaveLength(3)
  })

  it('each card has icon, title, description', () => {
    const wrapper = mount(FeatureGrid, { props: { heading: 'Test', items } })
    const card = wrapper.find('.feature-card')
    expect(card.find('.feature-icon').text()).toBe('🔀')
    expect(card.find('h3').text()).toBe('Branching')
    expect(card.find('p').text()).toBe('Dynamic routing')
  })

  it('matches snapshot', () => {
    const wrapper = mount(FeatureGrid, { props: { label: 'Why', heading: 'Features', items } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 2: Create CodeShowcase.test.ts**

Create `src/components/home/__tests__/CodeShowcase.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CodeShowcase from '../CodeShowcase.vue'

const baseProps = {
  heading: 'Test Heading',
  description: 'A description',
  codeBlock: { filename: 'test.json', html: '<span class="c-key">"key"</span>: <span class="c-value">"val"</span>' },
}

describe('CodeShowcase', () => {
  it('label hidden when omitted', () => {
    const wrapper = mount(CodeShowcase, { props: baseProps })
    expect(wrapper.find('.section-label').exists()).toBe(false)
  })

  it('label shown when provided', () => {
    const wrapper = mount(CodeShowcase, { props: { ...baseProps, label: 'Config' } })
    expect(wrapper.find('.section-label').text()).toBe('Config')
  })

  it('action hidden when omitted', () => {
    const wrapper = mount(CodeShowcase, { props: baseProps })
    expect(wrapper.find('.showcase-btn').exists()).toBe(false)
  })

  it('action shown when provided', () => {
    const wrapper = mount(CodeShowcase, { props: { ...baseProps, action: { text: 'Learn More', link: '/docs' } } })
    const btn = wrapper.find('.showcase-btn')
    expect(btn.exists()).toBe(true)
    expect(btn.attributes('href')).toBe('/docs')
  })

  it('renders code block filename and html', () => {
    const wrapper = mount(CodeShowcase, { props: baseProps })
    expect(wrapper.find('.code-title').text()).toBe('test.json')
    expect(wrapper.find('.code-body code').html()).toContain('c-key')
  })

  it('heading rendered via v-html', () => {
    const wrapper = mount(CodeShowcase, {
      props: { ...baseProps, heading: 'As <span class="gradient-text">JSON</span>' },
    })
    expect(wrapper.find('.gradient-text').exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = mount(CodeShowcase, { props: { ...baseProps, label: 'Config', action: { text: 'More', link: '/m' } } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 3: Create ArchitectureFlow.test.ts**

Create `src/components/home/__tests__/ArchitectureFlow.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ArchitectureFlow from '../ArchitectureFlow.vue'

const steps = [
  { icon: '🚀', title: 'Dispatch', subtitle: 'Start' },
  { icon: '⚙️', title: 'Engine', subtitle: 'Process' },
  { icon: '✅', title: 'Done', subtitle: 'Complete' },
]

describe('ArchitectureFlow', () => {
  it('label hidden when omitted', () => {
    const wrapper = mount(ArchitectureFlow, { props: { heading: 'Test', steps } })
    expect(wrapper.find('.section-label').exists()).toBe(false)
  })

  it('label shown when provided', () => {
    const wrapper = mount(ArchitectureFlow, { props: { label: 'Arch', heading: 'Test', steps } })
    expect(wrapper.find('.section-label').text()).toBe('Arch')
  })

  it('subtitle hidden when omitted', () => {
    const wrapper = mount(ArchitectureFlow, { props: { heading: 'Test', steps } })
    expect(wrapper.find('.arch-subtitle').exists()).toBe(false)
  })

  it('subtitle shown when provided', () => {
    const wrapper = mount(ArchitectureFlow, { props: { heading: 'Test', subtitle: 'How it works', steps } })
    expect(wrapper.find('.arch-subtitle').text()).toBe('How it works')
  })

  it('correct number of steps', () => {
    const wrapper = mount(ArchitectureFlow, { props: { heading: 'Test', steps } })
    expect(wrapper.findAll('.arch-node')).toHaveLength(3)
  })

  it('N-1 arrows for N steps', () => {
    const wrapper = mount(ArchitectureFlow, { props: { heading: 'Test', steps } })
    expect(wrapper.findAll('.arch-arrow')).toHaveLength(2)
  })

  it('each step has icon, title, subtitle', () => {
    const wrapper = mount(ArchitectureFlow, { props: { heading: 'Test', steps } })
    const node = wrapper.find('.arch-node')
    expect(node.find('.arch-icon').text()).toBe('🚀')
    expect(node.find('h4').text()).toBe('Dispatch')
    expect(node.find('p').text()).toBe('Start')
  })

  it('heading rendered via v-html', () => {
    const wrapper = mount(ArchitectureFlow, {
      props: { heading: 'How it <span class="gradient-text">works</span>', steps },
    })
    expect(wrapper.find('.gradient-text').exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = mount(ArchitectureFlow, { props: { label: 'Arch', heading: 'Flow', subtitle: 'Sub', steps } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 4: Create WorkflowDiagram.test.ts**

Create `src/components/home/__tests__/WorkflowDiagram.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import WorkflowDiagram from '../WorkflowDiagram.vue'

describe('WorkflowDiagram', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('uses default steps when no prop', () => {
    const wrapper = mount(WorkflowDiagram)
    const nodes = wrapper.findAll('.diagram-node')
    expect(nodes).toHaveLength(5)
    expect(nodes[0].text()).toBe('Dispatch')
    expect(nodes[4].text()).toBe('Complete')
  })

  it('uses custom steps when provided', () => {
    const steps = [
      { label: 'A', color: '#FF0000' },
      { label: 'B', color: '#00FF00' },
    ]
    const wrapper = mount(WorkflowDiagram, { props: { steps } })
    const nodes = wrapper.findAll('.diagram-node')
    expect(nodes).toHaveLength(2)
    expect(nodes[0].text()).toBe('A')
    expect(nodes[1].text()).toBe('B')
  })

  it('first node starts active', () => {
    const wrapper = mount(WorkflowDiagram)
    const nodes = wrapper.findAll('.diagram-node')
    expect(nodes[0].classes()).toContain('active')
    expect(nodes[1].classes()).not.toContain('active')
  })

  it('active index advances on timer', async () => {
    const wrapper = mount(WorkflowDiagram)
    vi.advanceTimersByTime(2400)
    await wrapper.vm.$nextTick()
    const nodes = wrapper.findAll('.diagram-node')
    expect(nodes[1].classes()).toContain('active')
    expect(nodes[0].classes()).not.toContain('active')
  })

  it('N-1 arrows for N nodes', () => {
    const wrapper = mount(WorkflowDiagram)
    expect(wrapper.findAll('.diagram-arrow')).toHaveLength(4)
  })

  it('matches snapshot', () => {
    const wrapper = mount(WorkflowDiagram)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 5: Create HeroSection.test.ts**

Create `src/components/home/__tests__/HeroSection.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import HeroSection from '../HeroSection.vue'

const baseProps = {
  title: 'Build <span class="gradient-text">workflows</span>',
  description: 'A workflow engine',
  primaryAction: { text: 'Get Started', link: '/start' },
}

describe('HeroSection', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders title via v-html', () => {
    const wrapper = shallowMount(HeroSection, { props: baseProps })
    expect(wrapper.find('.hero-title').html()).toContain('gradient-text')
  })

  it('renders description', () => {
    const wrapper = shallowMount(HeroSection, { props: baseProps })
    expect(wrapper.find('.hero-description').text()).toBe('A workflow engine')
  })

  it('renders primary action', () => {
    const wrapper = shallowMount(HeroSection, { props: baseProps })
    const btn = wrapper.find('.btn-primary')
    expect(btn.exists()).toBe(true)
    expect(btn.attributes('href')).toBe('/start')
  })

  it('secondary action hidden when omitted', () => {
    const wrapper = shallowMount(HeroSection, { props: baseProps })
    expect(wrapper.find('.btn-secondary').exists()).toBe(false)
  })

  it('secondary action shown when provided', () => {
    const wrapper = shallowMount(HeroSection, {
      props: { ...baseProps, secondaryAction: { text: 'GitHub', link: 'https://github.com/test' } },
    })
    const btn = wrapper.find('.btn-secondary')
    expect(btn.exists()).toBe(true)
    expect(btn.text()).toBe('GitHub')
  })

  it('external secondary action gets target _blank', () => {
    const wrapper = shallowMount(HeroSection, {
      props: { ...baseProps, secondaryAction: { text: 'GitHub', link: 'https://github.com/test' } },
    })
    expect(wrapper.find('.btn-secondary').attributes('target')).toBe('_blank')
  })

  it('hero-right hidden when no code and no diagram', () => {
    const wrapper = shallowMount(HeroSection, { props: baseProps })
    expect(wrapper.find('.hero-right').exists()).toBe(false)
  })

  it('code block renders filename and html', () => {
    const wrapper = shallowMount(HeroSection, {
      props: { ...baseProps, codeBlock: { filename: 'app.php', html: '<span>code</span>' } },
    })
    expect(wrapper.find('.code-title').text()).toBe('app.php')
    expect(wrapper.find('.code-body').html()).toContain('<span>code</span>')
  })

  it('workflow diagram renders when enabled', () => {
    const wrapper = shallowMount(HeroSection, {
      props: { ...baseProps, showWorkflowDiagram: true },
    })
    expect(wrapper.find('.hero-right').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'WorkflowDiagram' }).exists()).toBe(true)
  })

  it('matches snapshot', () => {
    const wrapper = shallowMount(HeroSection, {
      props: {
        ...baseProps,
        secondaryAction: { text: 'GitHub', link: 'https://github.com/test' },
        codeBlock: { filename: 'test.php', html: '<span>code</span>' },
        showWorkflowDiagram: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 6: Run all tests**

```bash
npx vitest run
```

Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "Add Home Page Component Tests"
```

---

## Task 7: Test layouts

**Files:**
- Create: `src/layouts/__tests__/HomeLayout.test.ts`
- Create: `src/layouts/__tests__/DocLayout.test.ts`

- [ ] **Step 1: Create HomeLayout.test.ts**

Create `src/layouts/__tests__/HomeLayout.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import HomeLayout from '../HomeLayout.vue'
import { mockThemeConfig } from '../../__tests__/helpers'

describe('HomeLayout', () => {
  it('renders NavBar and Footer', () => {
    mockThemeConfig({})
    const wrapper = shallowMount(HomeLayout)
    expect(wrapper.findComponent({ name: 'NavBar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'Footer' }).exists()).toBe(true)
  })

  it('renders MobileNav', () => {
    mockThemeConfig({})
    const wrapper = shallowMount(HomeLayout)
    expect(wrapper.findComponent({ name: 'MobileNav' }).exists()).toBe(true)
  })

  it('matches snapshot', () => {
    mockThemeConfig({})
    const wrapper = shallowMount(HomeLayout)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 2: Create DocLayout.test.ts**

Create `src/layouts/__tests__/DocLayout.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import DocLayout from '../DocLayout.vue'
import { mockThemeConfig, mockRoute, sampleSidebar } from '../../__tests__/helpers'

describe('DocLayout', () => {
  it('renders NavBar, SideBar, TOC', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/guide/intro')
    const wrapper = shallowMount(DocLayout)
    expect(wrapper.findComponent({ name: 'NavBar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'SideBar' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'TableOfContents' }).exists()).toBe(true)
  })

  it('has 3-column grid structure', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/guide/intro')
    const wrapper = shallowMount(DocLayout)
    expect(wrapper.find('.doc-body').exists()).toBe(true)
  })

  it('matches snapshot', () => {
    mockThemeConfig({ sidebar: sampleSidebar })
    mockRoute('/guide/intro')
    const wrapper = shallowMount(DocLayout)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
```

- [ ] **Step 3: Run all tests**

```bash
npx vitest run
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "Add Layout Tests"
```

---

## Task 8: Add GitHub Actions workflow

**Files:**
- Create: `.github/workflows/test.yml`

- [ ] **Step 1: Create .github/workflows/test.yml**

```bash
mkdir -p .github/workflows
```

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on:
  push:
    branches: ['**']
  pull_request:
    branches: [master]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

- [ ] **Step 2: Run tests one final time locally**

```bash
npx vitest run
```

Expected: all tests pass.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "Add GitHub Actions CI Workflow"
```
