import type {  ReqInterceptor } from '../../types'

export function createRandomInterceptor(randomKey = '_rnd'):ReqInterceptor  {
  return [
    (config) => {
      config.params = Object.assign(config.params || {}, { [randomKey]: Math.random() })
      return config
    }
  ]
}