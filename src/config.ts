export interface NavItem {
  text: string
  link: string
}

export interface SidebarGroup {
  text: string
  items: { text: string; link: string }[]
}

export interface ThemeConfig {
  /** Path to logo image, or light/dark pair */
  logo?: string | { light: string; dark: string }

  /** Top navigation links */
  nav: NavItem[]

  /** Sidebar navigation groups */
  sidebar: SidebarGroup[]

  /** Footer content */
  footer?: {
    text?: string
    links?: { text: string; link: string }[]
  }

  /** GitHub repository URL shown in navbar */
  github?: string

  /** Call-to-action button in navbar */
  cta?: {
    text: string
    link: string
  }
}

/**
 * Type helper for VitePress themeConfig.
 * Returns the config object unchanged — exists only for TypeScript autocompletion.
 */
export function defineThemeConfig(config: ThemeConfig): ThemeConfig {
  return config
}
