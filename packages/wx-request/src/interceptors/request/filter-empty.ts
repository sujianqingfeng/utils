import { objectRemoveEmptyProp } from '@sujian/utils-shared'
import type {  ReqInterceptor  } from '../../types'

export const FILTER_EMPTY_PARAMS_KEY = '_filterEmptyParams'

export function createFilterEmptyInterceptor(): ReqInterceptor  {
  return  (context) => {

    const { requestOption } = context

    const value = requestOption[FILTER_EMPTY_PARAMS_KEY] 
    const isFilter =
      value === undefined
        ? true
        : requestOption[FILTER_EMPTY_PARAMS_KEY]

    if (isFilter) {
      requestOption.data =  objectRemoveEmptyProp(requestOption.data)
    }

    return context
  }
  
}