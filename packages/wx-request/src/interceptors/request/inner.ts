import type { ReqInterceptor } from '../../types'

export function createInnerReqInterceptor(interceptor: ReqInterceptor): ReqInterceptor {
  return interceptor
}