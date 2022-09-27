import type { Context } from '../types'

export const REMOVE_PREFIX = '_remove_prefix'

export const createPrefix = (prefix: string) => {
  const create = (context: Context) => {
    const { config, key } = context
    const isPrefix =
      config[REMOVE_PREFIX] === undefined ? true : !config[REMOVE_PREFIX]
    context.key = isPrefix ? `${prefix}${key}` : key
  }

  return {
    prefixRead: create,
    prefixWrite: create,
  }
}