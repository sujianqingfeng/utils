import { objectRemoveEmptyProp } from '@sujian/utils-shared'
import type {  ReqInterceptor } from '../../types'

export const FILTER_EMPTY_PARAMS_KEY = '_filterEmptyParams'

export function createFilterEmptyInterceptor():ReqInterceptor  {
  return [
    (config) => {

      const isFilter =
      config[FILTER_EMPTY_PARAMS_KEY] === undefined
        ? true
        : config[FILTER_EMPTY_PARAMS_KEY]

      if (isFilter) {
        if (config.method === 'get' && config.params) {
          config.params  = objectRemoveEmptyProp(config.params)
        } else {
          config.data = objectRemoveEmptyProp(config.data)
        }
      }

      return config
    }
  ]
}