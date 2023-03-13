import { cookieStorage } from './cookie'
import { memoryStorage } from './memory'

export enum StorageType {
  LOCAL,
  SESSION,
  MEMORY,
  COOKIE
}

export const storages = {
  [StorageType.LOCAL]: () => localStorage,
  [StorageType.SESSION]: () => sessionStorage,
  [StorageType.MEMORY]: () => memoryStorage,
  [StorageType.COOKIE]: () => cookieStorage,
}