import type {  ResponseInterceptor } from '../../types'

export function createInnerResponseInterceptor(interceptor:ResponseInterceptor):ResponseInterceptor {
  return interceptor
}