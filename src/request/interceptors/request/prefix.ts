import type { RequestInterceptor } from '../../types'

export const PREFIX_KEY = '_prefixKey'

export function createPrefixInterceptor(defaultPrefix = ''):RequestInterceptor  {
  return [
    (config) => {
      const prefix = config[PREFIX_KEY ]

      config.url = `${prefix ?? defaultPrefix}${config.url}`
      return config 
    }
  ]
}