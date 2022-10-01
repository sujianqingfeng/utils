import type { Context, Options } from '../types'

export type PrefixConfig = {
  removePrefix?: boolean
} & Partial<Exclude<Options, 'interceptor'>>

export const createPrefix = (prefix: string) => {
  const create = (context: Context) => {
    const { config, key } = context
    const { removePrefix } = config as PrefixConfig
    const isPrefix =
      removePrefix === undefined ? true : !removePrefix
      
    context.key = isPrefix ? `${prefix}${key}` : key
  }

  return {
    prefixRead: create,
    prefixWrite: create,
  }
}