import { describe, it, expect } from 'vitest'
import { defineThemeConfig } from '../config'

describe('defineThemeConfig', () => {
  it('returns the same object reference that was passed in', () => {
    const config = { nav: [], sidebar: [] }
    const result = defineThemeConfig(config)
    expect(result).toBe(config)
  })

  it('works with minimal config (nav: [], sidebar: [])', () => {
    const config = defineThemeConfig({ nav: [], sidebar: [] })
    expect(config.nav).toEqual([])
    expect(config.sidebar).toEqual([])
  })
})
