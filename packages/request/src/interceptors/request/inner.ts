import type { ReqInterceptor } from '../../types'

export function createInnerRequestInterceptor(interceptor:ReqInterceptor ):ReqInterceptor  {
  return interceptor
}