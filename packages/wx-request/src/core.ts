import type { ReqInterceptor, RequestConfig,  RequestContext, RequestOption, RespInterceptor, MethodFn, WxRequest } from './types'

function createRequestContext(option: RequestOption, config: RequestConfig = {}): RequestContext {
  return {
    requestOption: option,
    config
  }
}

export function createPlatformRequest<T extends WxRequest>(platformRequest: T) {

  function request(context: RequestContext) {
    return new Promise((resolve, reject) => {
      platformRequest({
        ...context.requestOption,
        success: (res) => {
          context.response = res
          resolve(context)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }

  return (defaultOptions?: RequestOption) => {

    const requestInterceptors: ReqInterceptor[] = [] 
    const responseInterceptors: RespInterceptor[] = []

    const process = async (context: RequestContext) => {
      let p = Promise.resolve<any>(context)

      requestInterceptors.forEach(interceptor => {
        const [onfulfilled, onrejected] = interceptor
        p = p.then(onfulfilled, onrejected)
      })
    
      p = p.then(request, undefined)

      responseInterceptors.forEach(interceptor => {
        const [onfulfilled, onrejected] = interceptor
        p = p.then(onfulfilled, onrejected)
      })
      return p
    }

    const createBase = (method: RequestOption['method']) => {
      return async <R= any>(url: string, data?: object, config?: Optional<RequestOption>) => {
        const option: RequestOption = {
          ...defaultOptions,
          ...config,
          url,
          data,
          method
        } 
        const context = createRequestContext(option)
        return process(context) as Promise<R>
      }
    } 
    const _methods =  ['get', 'post', 'delete', 'put'] as const

    const methods =  _methods.reduce<Record<string, any>>((pre, key) => {
      pre[key]  = createBase(key as RequestOption['method'])
      return pre
    }, {})  as MethodFn<typeof _methods>

    const requestInstance = {
      useReqInterceptor(...interceptors: ReqInterceptor[]) {
        requestInterceptors.push(...interceptors)
        return requestInstance
      },
      useRespInterceptor(...interceptors: RespInterceptor[]) {
        responseInterceptors.push(...interceptors)
        return requestInstance
      },
      ...methods
    }

    return requestInstance 
  }
}

export const createRequest = createPlatformRequest(wx.request)

