import type { ExtractDataInterceptorOptions, RequestContext, RespInterceptor } from '../../types'

export function createExtractDataInterceptor(options: ExtractDataInterceptorOptions = {}): RespInterceptor<RequestContext>  {
  const { extract } = options 

  return  [
    (context) => {
      const { response } = context
      if (!response) {
        return Promise.reject('no response')
      }

      if (extract) {
        return Promise.resolve(extract(response)) 
      }
      return Promise.resolve(response.data)
    }
  ]
}