import { isPromise } from '@sujian/utils-shared'
import type { Interceptor,  RequestConfig,  RequestContext, RequestOption } from './types'

function request(option:RequestOption) {
  return new Promise((resolve, reject) => {
    wx.request({
      ...option,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

function traverseInterceptors(context:RequestContext, interceptors:Interceptor[]) {
  interceptors.forEach(interceptor => {
    interceptor(context)
  })
}

function traverseRespInterceptors(context:RequestContext, interceptors:Interceptor[], index = 0) {
  const  interceptor = interceptors[index]
  const res = interceptor(context)

}

function createRequestContext(option:RequestOption, config:RequestConfig = {}):RequestContext {
  return {
    requestOption: option,
    response: {},
    config
  }
}

function getBasicRequestOption(url:string, data:any, method: RequestOption['method'], config?:Optional<RequestOption>):RequestOption {
  return {
    ...config,
    url,
    data,
    method
  }
}

export function createRequest() {

  const requestInterceptors:Interceptor[] = [] 
  const responseInterceptors:Interceptor[] = []

  const process = async (context:RequestContext) => {
    traverseInterceptors(context, requestInterceptors)
    const res = await request(context.requestOption)
    context.response = res
    traverseInterceptors(context, responseInterceptors)
    return context.response
  }

  const get = async <R= any>(url:string, params?:object, config?:Optional<RequestOption>) => {
    const option = getBasicRequestOption(url, params, 'GET', config)
    const context = createRequestContext(option)
    return process(context) as Promise<R>
  }

  const post = async <R= any>(url:string, data?:any, config?:Optional<RequestOption>) => {
    const option = getBasicRequestOption(url, data, 'POST', config)
    const context = createRequestContext(option)
    return process(context) as Promise<R>
  }

  const _delete = async <R= any>(url:string, data?:any, config?:Optional<RequestOption>) => {
    const option = getBasicRequestOption(url, data, 'DELETE', config)
    const context = createRequestContext(option)
    return process(context) as Promise<R>
  }

  const put = async <R= any>(url:string, data?:any, config?:Optional<RequestOption>) => {
    const option = getBasicRequestOption(url, data, 'PUT', config)
    const context = createRequestContext(option)
    return process(context) as Promise<R>
  }

  const requestInstance = {
    useReqInterceptor(...interceptors: Interceptor[]) {
      requestInterceptors.push(...interceptors)
      return requestInstance
    },
    useRespInterceptor(...interceptors: Interceptor[]) {
      responseInterceptors.push(...interceptors)
      return requestInstance
    },
    get,
    post,
    delete: _delete,
    put
  }

  return requestInstance 
}