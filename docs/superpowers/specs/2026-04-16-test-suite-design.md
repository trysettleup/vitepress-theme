# @settleup/vitepress-theme Test Suite — Design Spec

**Date:** 2026-04-16
**Status:** Draft
**Goal:** Add full test coverage to the `@settleup/vitepress-theme` package using Vitest + Vue Test Utils, plus a GitHub Actions workflow to run tests on Node 20 and 22.

## Test Stack

- **Test runner:** Vitest
- **Component testing:** @vue/test-utils
- **DOM environment:** jsdom
- **Snapshots:** Vitest built-in snapshot support

## Dependencies (devDependencies)

- `vitest`
- `@vue/test-utils`
- `jsdom`

## Configuration

**`vitest.config.ts`** at package root:
- Environment: `jsdom`
- Setup file: `src/__tests__/setup.ts` (global VitePress mocks)
- Include: `src/**/*.test.ts`

**`package.json`** script:
- `"test": "vitest run"`
- `"test:watch": "vitest"`

## File Structure

```
src/
├── __tests__/
│   ├── setup.ts                      # Global VitePress mock (useData, useRoute)
│   ├── helpers.ts                    # Mock config factory, mount helpers
│   ├── config.test.ts                # defineThemeConfig tests
│   └── index.test.ts                 # Theme entry point tests
├── components/
│   └── __tests__/
│       ├── NavBar.test.ts
│       ├── SideBar.test.ts
│       ├── MobileNav.test.ts
│       ├── Footer.test.ts
│       ├── PrevNext.test.ts
│       ├── SectionLabel.test.ts
│       ├── ThemeToggle.test.ts
│       ├── TableOfContents.test.ts
│       └── CardGrid.test.ts
├── components/home/
│   └── __tests__/
│       ├── HeroSection.test.ts
│       ├── FeatureGrid.test.ts
│       ├── CodeShowcase.test.ts
│       ├── ArchitectureFlow.test.ts
│       └── WorkflowDiagram.test.ts
└── layouts/
    └── __tests__/
        ├── HomeLayout.test.ts
        └── DocLayout.test.ts
.github/
└── workflows/
    └── test.yml
```

## VitePress Mock

A shared setup file that mocks the `vitepress` module. All components that use `useData()` or `useRoute()` depend on this.

```ts
// src/__tests__/setup.ts
vi.mock('vitepress', () => ({
  useData: vi.fn(),
  useRoute: vi.fn(),
}))
```

A helper factory creates configurable mock returns:

```ts
// src/__tests__/helpers.ts
import { ref } from 'vue'
import { useData, useRoute } from 'vitepress'
import type { ThemeConfig } from '../config'

export function mockThemeConfig(config: Partial<ThemeConfig>) {
  const defaults: ThemeConfig = {
    nav: [],
    sidebar: [],
  }
  ;(useData as any).mockReturnValue({
    theme: ref({ ...defaults, ...config }),
    frontmatter: ref({}),
    site: ref({ title: 'Test' }),
  })
}

export function mockRoute(path: string) {
  ;(useRoute as any).mockReturnValue({ path })
}
```

## Test Coverage

### config.ts

| Test | Description |
|---|---|
| returns same object | `defineThemeConfig(obj)` returns `obj` unchanged |

### index.ts

| Test | Description |
|---|---|
| exports Theme object | Default export has `Layout` function and `enhanceApp` function |
| enhanceApp registers globals | Calling `enhanceApp` registers CardGrid, Hero, FeatureGrid, CodeShowcase, ArchitectureFlow as global components |

### NavBar.vue

| Test | Description |
|---|---|
| renders nav links from config | Each `nav` item renders as a link with correct text and href |
| logo: string | Single string logo renders as `<img>` with that src |
| logo: light/dark picks dark when dark mode | When `document.documentElement` has `dark` class, uses `logo.dark` |
| logo: light/dark picks light when light mode | When no `dark` class, uses `logo.light` |
| github icon shown when configured | `<a>` with GitHub SVG present when `github` is set |
| github icon hidden when not configured | No GitHub link when `github` is undefined |
| CTA shown when configured | CTA button renders with correct text and link |
| CTA hidden when not configured | No CTA when `cta` is undefined |
| mobile hamburger emits toggleMobile | Clicking hamburger button emits `toggleMobile` |
| snapshot | Full render snapshot |

### SideBar.vue

| Test | Description |
|---|---|
| renders groups from config | Each sidebar group renders with title |
| all groups start open | All group items are visible on mount |
| toggle collapses group | Clicking group title hides its items |
| active link detection | Link matching current route gets `.active` class |
| active link with .html suffix | Link matching `route.path` minus `.html` gets `.active` class |
| snapshot | Full render snapshot |

### MobileNav.vue

| Test | Description |
|---|---|
| hidden when open=false | Neither overlay nor drawer rendered |
| shown when open=true | Both overlay and drawer rendered |
| renders sidebar groups | Groups from config render in drawer |
| overlay click emits close | Clicking overlay emits `close` |
| close button emits close | Clicking close button emits `close` |
| link click emits close | Clicking a nav link emits `close` |
| snapshot | Full render snapshot (open state) |

### Footer.vue

| Test | Description |
|---|---|
| hidden when no footer config | Nothing rendered when `footer` is undefined |
| renders footer text | Text from config displayed |
| renders links | Each link renders with correct text and href |
| external links get target _blank | Links starting with `http` get `target="_blank"` and `rel="noopener"` |
| internal links no target | Links not starting with `http` have no `target` attribute |
| dot separators between links | N-1 separator elements for N links |
| snapshot | Full render snapshot |

### PrevNext.vue

| Test | Description |
|---|---|
| flattens sidebar into page list | Given multi-group sidebar, computes correct flat order |
| first page: no prev, has next | On first page, prev link absent, next link present |
| last page: has prev, no next | On last page, prev link present, next link absent |
| middle page: both shown | Both prev and next links present with correct text |
| unknown route: nothing rendered | When route doesn't match any sidebar item, component is empty |
| snapshot | Full render snapshot |

### SectionLabel.vue

| Test | Description |
|---|---|
| matches route to group name | Route matching a sidebar item returns that group's text |
| matches route with .html suffix | Route + `.html` still matches correctly |
| unknown route: hidden | No label rendered for unmatched route |
| snapshot | Full render snapshot |

### ThemeToggle.vue

| Test | Description |
|---|---|
| renders moon icon in light mode | SVG moon path present when not dark |
| renders sun icon in dark mode | SVG sun path present when dark |
| click toggles dark class | Clicking button toggles `document.documentElement.classList` |
| snapshot | Full render snapshot |

### TableOfContents.vue

| Test | Description |
|---|---|
| snapshot | Full render snapshot (empty state — no headings in jsdom) |

### CardGrid.vue

| Test | Description |
|---|---|
| renders slot content | Slot content appears inside `.card-grid` |
| snapshot | Full render snapshot |

### HeroSection.vue

| Test | Description |
|---|---|
| renders title via v-html | HTML in `title` prop rendered (gradient span present in DOM) |
| renders description | Description text present |
| renders primary action | Link with correct text and href |
| secondary action hidden when omitted | No secondary button when prop absent |
| secondary action shown when provided | Button with correct text and href |
| external secondary action gets target _blank | Link starting with `http` gets `target="_blank"` |
| hero-right hidden when no code and no diagram | Right column absent when both `codeBlock` and `showWorkflowDiagram` are falsy |
| code block renders filename and html | Code header shows filename, body contains HTML |
| workflow diagram renders when enabled | WorkflowDiagram component present when `showWorkflowDiagram=true` |
| snapshot | Full render snapshot |

### FeatureGrid.vue

| Test | Description |
|---|---|
| label hidden when omitted | No `.section-label` when `label` is undefined |
| label shown when provided | `.section-label` contains label text |
| heading rendered via v-html | Gradient span present in heading |
| correct number of cards | N items = N `.feature-card` elements |
| each card has icon, title, description | All three present in each card |
| snapshot | Full render snapshot |

### CodeShowcase.vue

| Test | Description |
|---|---|
| label hidden when omitted | No label element when undefined |
| action hidden when omitted | No action button when undefined |
| action shown when provided | Button with correct text and href |
| renders code block | Filename in header, HTML in code body |
| heading rendered via v-html | Gradient span present |
| snapshot | Full render snapshot |

### ArchitectureFlow.vue

| Test | Description |
|---|---|
| label hidden when omitted | No label element when undefined |
| subtitle hidden when omitted | No subtitle when undefined |
| correct number of steps | N steps = N `.arch-node` elements |
| N-1 arrows for N steps | Arrow count = steps.length - 1 |
| each step has icon, title, subtitle | All three present in each node |
| heading rendered via v-html | Gradient span present |
| snapshot | Full render snapshot |

### WorkflowDiagram.vue

| Test | Description |
|---|---|
| uses default steps when no prop | 5 default nodes rendered |
| uses custom steps when provided | Custom step labels appear |
| first node starts active | First `.diagram-node` has `.active` class on mount |
| active index advances on timer | After timer tick, next node becomes active |
| correct number of arrows | N-1 arrows for N nodes |
| snapshot | Full render snapshot |

### HomeLayout.vue

| Test | Description |
|---|---|
| renders NavBar and Footer | Both components present |
| mobile toggle opens MobileNav | Emitting toggleMobile shows MobileNav |
| snapshot | Full render snapshot |

### DocLayout.vue

| Test | Description |
|---|---|
| renders NavBar, SideBar, TOC | All structural components present |
| 3-column grid structure | `.doc-body` element present |
| snapshot | Full render snapshot |

## GitHub Actions Workflow

**File:** `.github/workflows/test.yml`

**Triggers:** Push to any branch, pull requests to `master`

**Matrix:** Node 20, Node 22

**Steps:**
1. Checkout
2. Setup Node (matrix version)
3. `npm ci`
4. `npm test`

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
