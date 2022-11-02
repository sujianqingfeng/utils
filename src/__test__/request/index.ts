import { createAxios, createPrefixInterceptor, createFilterEmptyInterceptor, createRandomInterceptor, createSerializeInterceptor, createRedirectInterceptor, createErrorMessageInterceptor, createExtractDataInterceptor } from '../../request'

export const request = createAxios({}, {
  requests: [createPrefixInterceptor(), createFilterEmptyInterceptor(), createRandomInterceptor(), createSerializeInterceptor()],
  responses: [
    createRedirectInterceptor({
      isRedirect(res) {
        const { status } = res
        if (status === 401) { return 'xxx' }
      },
    }), 
    createErrorMessageInterceptor({
      isInvalid(res) {
        const { status } = res
        if (status !== 200) {
          return 'error msg'
        }
      },
      showMessage(msg) {
        console.log('log message', msg)
      },
    }), 
    createExtractDataInterceptor()
  ]
})