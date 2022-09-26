import { isUndefined } from '../../basic'
import type { Storage } from '../types'

const MEMORY_KEY = '__memory_key__'

const getCurrentStorage  = () => {
  let storage =  window[MEMORY_KEY]

  if (isUndefined(storage)) {
    storage = window[MEMORY_KEY] = {} 
  }
  return storage
}

const getItem = (key: string) => {
  const storage = getCurrentStorage()
  return storage[key]
}

export const memoryStorage: Storage = {
  getItem
}