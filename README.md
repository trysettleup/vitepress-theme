# @settleup/vitepress-theme

A custom VitePress theme with dark/light mode, responsive layouts, and composable home page sections.

## Installation

```bash
npm install @settleup/vitepress-theme
```

Peer dependencies: `vitepress ^1.0.0` and `vue ^3.3.0`.

## Quick Start

### 1. Use the theme

```ts
// .vitepress/theme/index.ts
import theme from '@settleup/vitepress-theme'
export default theme
```

### 2. Configure your site

```ts
// .vitepress/config.ts
import { defineConfig } from 'vitepress'
import { defineThemeConfig } from '@settleup/vitepress-theme/config'

export default defineConfig({
  title: 'My Project',
  description: 'Project description',
  themeConfig: defineThemeConfig({
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg' },
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Reference', link: '/reference/api' },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Configuration', link: '/guide/configuration' },
        ],
      },
    ],
    github: 'https://github.com/your-org/your-repo',
    cta: { text: 'Get Started', link: '/guide/getting-started' },
    footer: {
      text: '© 2026 Your Project',
      links: [
        { text: 'Documentation', link: '/guide/getting-started' },
        { text: 'GitHub', link: 'https://github.com/your-org/your-repo' },
      ],
    },
  }),
})
```

### 3. Compose your home page

The theme provides global components you can use directly in markdown:

```md
---
layout: home
---

<script setup>
const heroCode = {
  filename: 'example.php',
  html: '<span class="c-comment">// Your code here</span>'
}
</script>

<Hero
  title='Build <span class="gradient-text">amazing things</span>'
  description="A short description of your project."
  :primary-action="{ text: 'Get Started', link: '/guide/getting-started' }"
  :secondary-action="{ text: 'View on GitHub', link: 'https://github.com/your-org/your-repo' }"
  :code-block="heroCode"
  :show-workflow-diagram="true"
/>

<FeatureGrid
  label="Features"
  heading='Why <span class="gradient-text">this project</span>'
  :items="[
    { icon: '🚀', title: 'Fast', description: 'Built for speed.' },
    { icon: '🔒', title: 'Secure', description: 'Security first.' },
    { icon: '📦', title: 'Modular', description: 'Use what you need.' },
  ]"
/>

<ArchitectureFlow
  label="Architecture"
  heading='How it <span class="gradient-text">works</span>'
  subtitle="From input to output"
  :steps="[
    { icon: '📥', title: 'Input', subtitle: 'Receive data' },
    { icon: '⚙️', title: 'Process', subtitle: 'Transform' },
    { icon: '📤', title: 'Output', subtitle: 'Deliver result' },
  ]"
/>
```

## Theme Config Reference

`defineThemeConfig()` accepts the following options:

| Option | Type | Required | Description |
|---|---|---|---|
| `logo` | `string \| { light: string; dark: string }` | No | Path to logo image, or separate light/dark variants |
| `nav` | `NavItem[]` | Yes | Top navigation links |
| `sidebar` | `SidebarGroup[]` | Yes | Sidebar navigation groups |
| `footer` | `{ text?: string; links?: { text: string; link: string }[] }` | No | Footer content |
| `github` | `string` | No | GitHub URL (shows icon in navbar) |
| `cta` | `{ text: string; link: string }` | No | Call-to-action button in navbar |

## Global Components

These components are registered globally and can be used in any `.md` file.

### `<Hero>`

Full-width dark hero section with gradient background effects.

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | Yes | Supports HTML (use `<span class="gradient-text">` for gradient) |
| `description` | `string` | Yes | Subtitle text |
| `primary-action` | `{ text: string; link: string }` | Yes | Primary CTA button |
| `secondary-action` | `{ text: string; link: string }` | No | Secondary button |
| `code-block` | `{ filename: string; html: string }` | No | Code example with syntax-highlighted HTML |
| `show-workflow-diagram` | `boolean` | No | Show animated workflow diagram |
| `workflow-steps` | `{ label: string; color?: string }[]` | No | Custom diagram steps |

### `<FeatureGrid>`

3-column grid of feature cards.

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | No | Small uppercase label above heading |
| `heading` | `string` | Yes | Section heading (supports HTML for gradient text) |
| `items` | `{ icon: string; title: string; description: string }[]` | Yes | Feature cards |

### `<CodeShowcase>`

Split layout with description on the left and an always-dark code block on the right.

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | No | Small uppercase label |
| `heading` | `string` | Yes | Section heading (supports HTML) |
| `description` | `string` | Yes | Descriptive text |
| `action` | `{ text: string; link: string }` | No | Action button |
| `code-block` | `{ filename: string; html: string }` | Yes | Code example |

### `<ArchitectureFlow>`

Horizontal flow diagram with steps connected by arrows.

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | No | Small uppercase label |
| `heading` | `string` | Yes | Section heading (supports HTML) |
| `subtitle` | `string` | No | Subtitle below heading |
| `steps` | `{ icon: string; title: string; subtitle: string }[]` | Yes | Flow steps |

### `<CardGrid>`

A 2-column grid for linking cards. Slot-based — provide your own card markup:

```md
<CardGrid>
  <a href="/guide" class="card-link">
    <div class="card-title">Guide</div>
    <div class="card-desc">Learn the basics</div>
  </a>
  <a href="/reference" class="card-link">
    <div class="card-title">Reference</div>
    <div class="card-desc">API documentation</div>
  </a>
</CardGrid>
```

## Code Token Classes

For syntax highlighting in `code-block` HTML, use these CSS classes:

| Class | Color (dark) | Use for |
|---|---|---|
| `.c-comment` | Muted gray | Comments |
| `.c-variable` | Pink | Variables |
| `.c-function` | Cyan | Function names |
| `.c-string` | Green | String literals |
| `.c-key` | Cyan | JSON keys |
| `.c-value` | White | JSON values |
| `.c-brace` | Muted gray | Brackets/braces |

## Customization

### Override CSS variables

```ts
// .vitepress/theme/index.ts
import theme from '@settleup/vitepress-theme'
import './overrides.css'
export default theme
```

```css
/* .vitepress/theme/overrides.css */
:root {
  --accent-primary: #8B5CF6;
  --accent-secondary: #EC4899;
}
```

### Extend with custom components

```ts
// .vitepress/theme/index.ts
import baseTheme from '@settleup/vitepress-theme'
import type { Theme } from 'vitepress'
import MyWidget from './components/MyWidget.vue'

const theme: Theme = {
  ...baseTheme,
  enhanceApp({ app, ...rest }) {
    baseTheme.enhanceApp?.({ app, ...rest })
    app.component('MyWidget', MyWidget)
  },
}

export default theme
```

## Design Tokens

The theme uses CSS custom properties for all colors, spacing, and typography. See `src/styles/variables.css` for the full list. Key tokens:

| Token | Light | Dark | Description |
|---|---|---|---|
| `--bg-base` | `#FFFFFF` | `#0F172A` | Page background |
| `--bg-elevated` | `#FAFAFA` | `#1E293B` | Elevated surfaces |
| `--text-primary` | `#18181B` | `#F1F5F9` | Primary text |
| `--text-secondary` | `#52525B` | `#94A3B8` | Secondary text |
| `--accent-primary` | `#0EA5E9` | `#0EA5E9` | Accent color |

## License

MIT
