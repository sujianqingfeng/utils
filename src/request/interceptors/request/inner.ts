import type { RequestInterceptor } from '../../types'

export function createInnerRequestInterceptor(interceptor:RequestInterceptor ):RequestInterceptor  {
  return interceptor
}