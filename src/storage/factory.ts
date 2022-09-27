import { storages, StorageType } from './storages'
import type { Options, Context, ExitFn, BeforeFn, ContextConfig } from './types'

export function createStorage(options: Partial<Options>) {

  const defaultOptions: Partial<Options> = {
    storageType: StorageType.LOCAL
  }

  const mergeOptions = { ...defaultOptions, ...options }

  function getStorage(options?: Partial<Options>) {
    const finalConfig = { ...mergeOptions, ...options }

    // TODO finalConfig merge is whether it is reasonable ？
    return { storage: storages[finalConfig.storageType](), finalConfig  }
  }

  function createContext(key: string, config: ContextConfig): Context  {
    return {
      key,
      config
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

  function getItem(key: string, opts?: Partial<Options>) {
    const { storage, finalConfig } = getStorage(opts)
    const context = createContext(key, finalConfig)

    const exitFns = beforeKey(context, finalConfig.interceptor.reads)

    let value = storage.getItem(key)
    value = afterValue(exitFns, value)

    return value
  }

  function setItem(key: string, value: any, opts?: Partial<Options>) {
    const { storage, finalConfig } = getStorage(opts)
    const context = createContext(key, finalConfig)

    const exitFns = beforeKey(context, finalConfig.interceptor.writes)
    value = afterValue(exitFns, value)

    return storage.setItem(context.key, value)
  }

  function removeItem(key: string, opts?: Partial<Options>) {
    const { storage, finalConfig } = getStorage(opts)
    const context = createContext(key, finalConfig)

    beforeKey(context, finalConfig.interceptor.reads)
    
    storage.removeItem(context.key)
  }

  function clear(opts?: Partial<Options>) {
    const { storage } = getStorage(opts)
    storage.clear()
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear
  }
}