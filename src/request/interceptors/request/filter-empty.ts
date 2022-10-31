import { objectRemoveEmptyProp } from '../../../object'
import type { RequestInterceptor } from '../../types'

export const FILTER_EMPTY_PARAMS_KEY = '_filterEmptyParams'

export function createFilterEmptyInterceptor():RequestInterceptor  {
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