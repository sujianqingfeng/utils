import { describe, it, expect } from 'vitest'
import {
  storage,
  StorageType,
} from './index'
import type { PrefixConfig, TypeConfig } from './index'

type MergeConfig = PrefixConfig & TypeConfig

describe('storage', () => {
  const prefix = '_prefix_'
  const removeType: TypeConfig = { removeType: true }

  describe('prefix', () => {
    it('with-prefix', () => {
      const key = 'with_prefix'
      const value = 'value'
      const prefixKey = prefix + key

      storage.setItem(key, value, removeType)

      expect(storage.getItem(key, removeType)).toEqual(
        localStorage.getItem(prefixKey)
      )
    })

    it('without-prefix', () => {
      const key = 'fff'
      const value = 'xxx'

      storage.setItem(key, value, { removePrefix: true } as PrefixConfig)

      expect(localStorage.getItem(key)).toEqual(
        storage.getItem(key, { removePrefix: true, ...removeType } as MergeConfig)
      )
      expect(localStorage.getItem(key)).not.toEqual(storage.getItem(key))
    })
  })

  describe('type', () => {
    it('string', () => {
      const key = 'string'
      const value = 'value'

      storage.setItem(key, value)

      const newValue = storage.getItem(key)

      expect(newValue).toEqual(value)
      expect(typeof newValue).toBe('string')
    })

    it('object', () => {
      const key = 'object'
      const value = {
        a: 1
      }

      storage.setItem(key, value)

      const newValue = storage.getItem(key)

      expect(newValue).toEqual(value)
      expect(typeof newValue).toBe('object')
    })
  })

  it('session', () => {
    const key = 'session'
    const value = 'value'
    storage.setItem(key, value, {
      storageType: StorageType.SESSION,
      removePrefix: true,
      removeType: true
    } as MergeConfig)

    expect(sessionStorage.getItem(key)).toEqual(value)
  })

  it('memory', () => {
    const key = 'memory'
    const value = 'value'
    storage.setItem(key, value, {
      storageType: StorageType.MEMORY,
      removePrefix: true,
      removeType: true
    } as MergeConfig)
    
    expect(window.__memory_key__[key]).toEqual(value)
  })

  it('cookie', () => {
    const key = 'cookie'
    const value = 'value'
    storage.setItem(key, value, {
      storageType: StorageType.COOKIE,
      removePrefix: true,
      removeType: true
    } as MergeConfig)
    
    expect(document.cookie).toMatchInlineSnapshot('"__cookie_key__=%7B%22cookie%22%3A%22value%22%7D"')
  })
})
