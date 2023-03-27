import {
  createAxios, createErrorMessageInterceptor, createExtractDataInterceptor,
  createFilterEmptyInterceptor, createRandomInterceptor, createRedirectInterceptor, createSerializeInterceptor 
} from '..'

const redirect = createRedirectInterceptor({
  isRedirect(res) {
    const { status } = res
    if (status === 401) { return 'xxx' }
  },
})

const errorMessage = createErrorMessageInterceptor({
  isInvalid(res) {
    const { status } = res
    if (status !== 200) {
      return 'error msg'
    }
  },
  showMessage(msg) {
    console.log('log message', msg)
  },
})

const request = createAxios({})

request
  .useReqInterceptor(createFilterEmptyInterceptor(), createRandomInterceptor(), createSerializeInterceptor())
  .useRespInterceptor(redirect, errorMessage, createExtractDataInterceptor())

export {
  request
}