import type { RequestInterceptor } from '../../types'

export function createRandomInterceptor(randomKey = '_rnd'):RequestInterceptor  {
  return [
    (config) => {
      config.params = Object.assign(config.params || {}, { [randomKey]: Math.random() })
      return config
    }
  ]
}