import type { RedirectInterceptorOptions, RespInterceptor } from '../../types'

export function createRedirectInterceptor(options:RedirectInterceptorOptions):RespInterceptor {
  const { isRedirect } = options

  return [
    (res) => {
      const redirectUrl = isRedirect(res)
      if (redirectUrl) {
        window.location.href = redirectUrl 
        window.location.reload()
      }

      return Promise.resolve(res)
    }
  ]
}