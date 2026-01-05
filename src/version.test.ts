import { describe, it, expect } from 'vitest'
import { VERSION } from './version'

describe('Version', () => {
  it('should have a valid version string', () => {
    expect(VERSION).toBeDefined()
    expect(typeof VERSION).toBe('string')
    expect(VERSION).toMatch(/^\d+\.\d+\.\d+$/)
  })

  it('should be a semantic version', () => {
    const parts = VERSION.split('.')
    expect(parts).toHaveLength(3)
    parts.forEach(part => {
      expect(part).toMatch(/^\d+$/)
    })
  })
})