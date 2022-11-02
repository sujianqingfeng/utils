import type { AxiosError, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios'

type AxiosInterceptor<T = any> = Parameters<AxiosInterceptorManager<T>['use']>

type OnFulfilled<T = any> = AxiosInterceptor<T>[0]
type OnRejected<T =any> = AxiosInterceptor<T>[1]

type Interceptor<T = any> = [OnFulfilled<T>, OnRejected<T>?]

export type CreateAxiosInterceptor = {
  requests?:RequestInterceptor[]
  responses?:ResponseInterceptor[]
} 

export type RequestInterceptor=Interceptor<AxiosRequestConfig> 
export type ResponseInterceptor=Interceptor<AxiosResponse> 

export type RedirectInterceptorOptions = {
  isRedirect:(res:AxiosResponse)=>string|undefined
}

export type ErrorMessageInterceptorOptions = {
  isInvalid:(res:AxiosResponse)=>string | undefined 
  showMessage:(msg:string | AxiosError)=>void
}

export type ExtractDataInterceptorOptions = {
  extract?:(res:AxiosResponse)=>any
}

