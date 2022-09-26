import type { Storage } from '../types'

const MEMORY_KEY = '__memory_key__'

const getCurrentStorage  = () => {
  const t =  window[MEMORY_KEY]
}

export const MemoryStorage: Storage = {
  getItem(key) {
  },
}