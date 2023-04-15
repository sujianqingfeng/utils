import type {  ReqInterceptor } from '../../types'

export const PREFIX_KEY = '_prefixKey'

export function createPrefixInterceptor(defaultPrefix = ''): ReqInterceptor  {
  return [
    (config) => {
      const prefix = config[PREFIX_KEY ]

      config.url = `${prefix ?? defaultPrefix}${config.url}`
      return config 
    }
  ]
}