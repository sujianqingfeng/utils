export enum StorageType{
  LOCAL,
  SESSION,
}

type Options = {
  storageType: StorageType
}

export function createStorage(options:Options) {

  const defaultOptions:Options = {
    storageType: StorageType.LOCAL
  }

  const mergeOptions = { ...defaultOptions, ...options }
}