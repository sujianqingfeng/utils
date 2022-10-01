import { StorageType } from './storages'

export type Storage = {
  getItem: (key: string) => any
  setItem: (key: string, value: any) => void
  removeItem: (key: string) => void
  clear: () => void
}

export type ExitFn = (value: any) => any

export type BeforeFn = (context: Context) => void | ExitFn

export type Interceptor = {
  reads: BeforeFn[],
  writes: ExitFn[]
}

export type Options = {
  storageType: StorageType,
  interceptor: Interceptor
}

export type ContextConfig = Record<string, any>
export type Context = {
  key: string
  config: ContextConfig 
}

export type MergeConfig = Partial<Exclude<Options, 'interceptor'>> & ContextConfig 