import type {  RespInterceptor } from '../../types'

export function createInnerResponseInterceptor(interceptor: RespInterceptor): RespInterceptor {
  return interceptor
}