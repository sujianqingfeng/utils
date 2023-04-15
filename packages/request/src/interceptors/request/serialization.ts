import type {  ReqInterceptor } from '../../types'
import stringify from 'qs-stringify'

export function createSerializeInterceptor(): ReqInterceptor  {
  return [
    (config) => {
      const { headers = {} } = config

      const contentType = headers['content-type'] || headers['Content-Type'] || ''

      if (contentType && !['multipart/form-data', 'application/json'].includes(contentType as string)) {
        config.data = stringify(config.data || {})
      } 

      if (config.method === 'get') {
        if (!config.paramsSerializer) {
          config.paramsSerializer = {}
        } 
        config.paramsSerializer.serialize = (params: Record<string, any>) => stringify(params)
      }

      return config 
    }
  ]
}