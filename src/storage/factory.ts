import { cookieStorage } from './storages/cookie'
import { memoryStorage } from './storages/memory'

export enum StorageType {
  LOCAL,
  SESSION,
  MEMORY,
  COOKIE
}

type Options = {
  storageType: StorageType
}

export function createStorage(options: Options) {

  const defaultOptions: Options = {
    storageType: StorageType.LOCAL
  }

  const mergeOptions = { ...defaultOptions, ...options }

  function getStorage(options: Partial<Options>) {
    const finalConfig = { ...mergeOptions, ...options }

    const storages = {
      [StorageType.LOCAL]: () => localStorage,
      [StorageType.SESSION]: () => sessionStorage,
      [StorageType.MEMORY]: () => memoryStorage,
      [StorageType.COOKIE]: () => cookieStorage,
    }

    return storages[finalConfig.storageType]()
  }

  function getItem(key: string, options: Partial<Options>) {
    const storage = getStorage(options)

    return storage.getItem(key)
  }

  return {
    getItem
  }
}