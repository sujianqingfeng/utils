import type {  ResponseInterceptor, ExtractDataInterceptorOptions } from '../../types'

export function createRedirectInterceptor(options:ExtractDataInterceptorOptions ):ResponseInterceptor {
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