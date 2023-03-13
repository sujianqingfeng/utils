import { createAxios, createErrorMessageInterceptor, createExtractDataInterceptor, createFilterEmptyInterceptor, createRandomInterceptor, createRedirectInterceptor, createSerializeInterceptor } from '..'

const request = createAxios({})

request.useReqInterceptor(createFilterEmptyInterceptor())
  .useReqInterceptor(createRandomInterceptor())
  .useReqInterceptor(createSerializeInterceptor())

request.useRespInterceptor(
  createRedirectInterceptor({
    isRedirect(res) {
      const { status } = res
      if (status === 401) { return 'xxx' }
    },
  }))
  .useRespInterceptor(createErrorMessageInterceptor({
    isInvalid(res) {
      const { status } = res
      if (status !== 200) {
        return 'error msg'
      }
    },
    showMessage(msg) {
      console.log('log message', msg)
    },
  }))
  .useRespInterceptor(createExtractDataInterceptor())

export {
  request
}