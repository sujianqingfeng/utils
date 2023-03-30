import { createPlatformRequest } from '@sujian/wx-request'
import type { UniRequest } from './types'

export * from '@sujian/wx-request'
export  * from './types'

export const createUniRequest = createPlatformRequest<UniRequest>(uni.request)

