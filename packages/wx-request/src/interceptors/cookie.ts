import type { CookieOptions, ReqInterceptor, RequestContext, RequestSuccessCallbackResult, RespInterceptor } from '../types'

export function createCookieInterceptor(options: CookieOptions) {
  const { getCookie, saveCookie } =  options
  const cookieReqInterceptor = (): ReqInterceptor => {
    return [
      (context) => {
        const cookie = getCookie(context).join(';')
        if (context.requestOption.header) {
          context.requestOption.header.cookie = cookie
        } else {
          context.requestOption.header = {
            cookie
          }
        }
        return context
      }
    ]
  }

  const cookieRespInterceptor = (): RespInterceptor<RequestContext<RequestSuccessCallbackResult>> => {
    return [
      (context) => {
        const { response } = context
        if (response) {
          const { cookies: _cookies } = response
          const cookies = _cookies.map(cookie => {
            const [value] = cookie.split(';')
            return value
          })
          saveCookie(cookies, context)
        }
        return Promise.resolve(context)
      }
    ]
  }

  return {
    cookieReqInterceptor,
    cookieRespInterceptor
  }
}