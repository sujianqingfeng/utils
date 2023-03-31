import { createPlatformRequest } from '@sujian/wx-request'
import type { WxRequest } from '@sujian/wx-request'

export * from '@sujian/wx-request'

export const createUniRequest = createPlatformRequest(uni.request as WxRequest)

