import { createPlatformRequest } from '@sujian/wx-request'

export * from '@sujian/wx-request'

export const createRequest = createPlatformRequest(uni.request)

