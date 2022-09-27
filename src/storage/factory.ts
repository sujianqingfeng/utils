import { cookieStorage } from './storages/cookie'
import { memoryStorage } from './storages/memory'

export enum StorageType {
  LOCAL,
  SESSION,
  MEMORY,
  COOKIE
}

type Interceptor = {
  reads: BeforeFn[],
  writes: ExitFn[]
}

type Options = {
  storageType: StorageType,
  interceptor: Interceptor
}

type Context = {
  key: string
}

type ExitFn = (value: any) => any
type BeforeFn = (context: Context) => void | ExitFn

const storages = {
  [StorageType.LOCAL]: () => localStorage,
  [StorageType.SESSION]: () => sessionStorage,
  [StorageType.MEMORY]: () => memoryStorage,
  [StorageType.COOKIE]: () => cookieStorage,
}

export function createStorage(options: Options) {

  const defaultOptions: Partial<Options> = {
    storageType: StorageType.LOCAL
  }

  const mergeOptions = { ...defaultOptions, ...options }

  function getStorage(options?: Partial<Options>) {
    const finalConfig = { ...mergeOptions, ...options }
    return { storage: storages[finalConfig.storageType](), finalConfig  }
    
  }

  function createContext(key: string): Context  {
    return {
      key
    }
  }

  function beforeKey(context: Context, fns: BeforeFn[]) {
    const exitFns: ExitFn[] = []

    fns.forEach(fn => {
      const exitFn = fn(context)
      if (exitFn) {
        exitFns.push(exitFn)
      }
    })

    return exitFns
  }

  function afterValue(exitFns: ExitFn[], value: any) {
    // 这里是倒序执行
    let i = exitFns.length
    while (i--) {
      value = exitFns[i](value)
    }
    return value
  }

  function getItem(key: string, options?: Partial<Options>) {
    const { storage, finalConfig } = getStorage(options)
    const context = createContext(key)

    const exitFns = beforeKey(context, finalConfig.interceptor.reads)

    let value = storage.getItem(key)
    value = afterValue(exitFns, value)

    return value
  }

  function setItem(key: string, value: any, options?: Partial<Options>) {
    const { storage, finalConfig } = getStorage(options)
    const context = createContext(key)

    const exitFns = beforeKey(context, finalConfig.interceptor.writes)
    value = afterValue(exitFns, value)

    return storage.setItem(context.key, value)
  }

  function removeItem(key: string, options?: Partial<Options>) {
    const { storage, finalConfig } = getStorage(options)
    const context = createContext(key)

    beforeKey(context, finalConfig.interceptor.reads)
    
    storage.removeItem(context.key)
  }

  return {
    getItem,
    setItem,
    removeItem
  }
}