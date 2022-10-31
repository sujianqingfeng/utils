import qs from 'qs'
import type { RequestInterceptor } from '../../types'

export function createSerializeInterceptor():RequestInterceptor  {
  return [
    (config) => {
      const { headers = {} } = config

      const contentType = headers['content-type'] || headers['Content-Type'] || ''

      if (contentType && !['multipart/form-data', 'application/json'].includes(contentType as string)) {
        config.data = qs.stringify(config.data || {})
      } 

      if (config.method === 'get') {
        if (!config.paramsSerializer) {
          config.paramsSerializer = {}
        } 
        config.paramsSerializer.serialize = (params: Record<string, any>) => qs.stringify(params)
      }

      return config 
    }
  ]
}