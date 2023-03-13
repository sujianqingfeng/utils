import type {  ExtractDataInterceptorOptions, RespInterceptor } from '../../types'

export function createExtractDataInterceptor(options:ExtractDataInterceptorOptions = {}):RespInterceptor {
  const { extract } = options 

  return [
    (res) => {
      if (extract) {
        return Promise.resolve(extract(res))
      }
      return Promise.resolve(res.data)
    }
  ]
}