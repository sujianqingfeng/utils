import type { ErrorMessageInterceptorOptions, RespInterceptor, RequestContext } from '../../types'

export const SHOW_ERROR_MESSAGE_KEY = '_showErrorMessage'

const isShowErrorMessage = (context: RequestContext) => {
  const { requestOption } = context
  const temp = requestOption[SHOW_ERROR_MESSAGE_KEY]
  return temp === undefined ? true : temp
}

export function createErrorMessageInterceptor(options:ErrorMessageInterceptorOptions):RespInterceptor  {
  const {
    isInvalid,
    showMessage
  } = options

  return  (context) => {
    const message = isInvalid(context)
    if (message) {
      const isShow = isShowErrorMessage(context)
      isShow && showMessage(message)
      // return Promise.reject(new Error(message))
    }
  }
}
