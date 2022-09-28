import type { Storage } from '../types'

const MEMORY_KEY = '__memory_key__'

declare global {
  interface Window {
    [MEMORY_KEY]: Record<string, any>;
  }
}

const getCurrentStorage  = () => {
  const storage =  window[MEMORY_KEY] || (window[MEMORY_KEY] = {})
  return storage
}

const getItem = (key: string) => {
  const storage = getCurrentStorage()
  return storage[key]
}

const setItem = (key: string, value: any) => {
  const storage = getCurrentStorage()
  storage[key] = value
}

const removeItem = (key: string) => {
  const storage = getCurrentStorage()
  delete storage[key]
}

const clear = () => {
  window[MEMORY_KEY] = {}
}

export const memoryStorage: Storage = {
  getItem,
  setItem,
  removeItem,
  clear
}