
import type { ExtractDataInterceptorOptions, RespInterceptor } from '../../types'

export function createExtractDataInterceptor(options:ExtractDataInterceptorOptions = {}):RespInterceptor  {
  const { extract } = options 

  return  (context) => {
    const { response } = context
    if (extract) {
      context.response = extract(response)
    }
    context.response = response.data
  }
}