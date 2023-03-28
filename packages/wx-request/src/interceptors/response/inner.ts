import type { RespInterceptor } from '../../types'

export function createInnerRespInterceptor(interceptor: RespInterceptor): RespInterceptor {
  return interceptor
}