import { storages, StorageType } from './storages'
import type { Options, Context, ExitFn, BeforeFn, MergeConfig } from './types'

export function createStorage(options: Partial<Options>) {

  const defaultOptions: Partial<Options> = {
    storageType: StorageType.LOCAL
  }

  const mergeOptions = { ...defaultOptions, ...options }

  function getStorage(options?: Partial<Options>) {
    const finalConfig = { ...mergeOptions, ...options }
    const { storageType = StorageType.LOCAL } = finalConfig
    return storages[storageType]()
  }

  function createContext(key: string, config: MergeConfig = {}): Context  {
    return {
      key,
      config
    }
  }

  function beforeKey(context: Context, fns: BeforeFn[] = []) {
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

  function getItem(key: string, config?: MergeConfig) {
    const storage = getStorage(config)
    const context = createContext(key, config)

    const exitFns = beforeKey(context, mergeOptions.interceptor?.reads)

    let value = storage.getItem(context.key)
    value = afterValue(exitFns, value)

    return value
  }

  function setItem(key: string, value: any, config?: MergeConfig) {
    const storage = getStorage(config)
    const context = createContext(key, config)

    const exitFns = beforeKey(context, mergeOptions.interceptor?.writes)
    value = afterValue(exitFns, value)

    return storage.setItem(context.key, value)
  }

  function removeItem(key: string, config?: MergeConfig) {
    const storage = getStorage(config)
    const context = createContext(key, config)

    beforeKey(context, mergeOptions.interceptor?.reads)
    
    storage.removeItem(context.key)
  }

  function clear(opts?: Partial<Options>) {
    const storage = getStorage(opts)
    storage.clear()
  }

  return {
    getItem,
    setItem,
    removeItem,
    clear
  }
}