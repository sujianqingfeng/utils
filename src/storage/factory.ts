export enum StorageType {
  LOCAL,
  SESSION,
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
      [StorageType.LOCAL]: localStorage
    }

  }

  function getItem(key: string, options: Partial<Options>) {
    const storage = getStorage(options)
  }

  return {
    getItem
  }
}