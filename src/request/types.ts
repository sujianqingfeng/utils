import type { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios'

type AxiosInterceptor<T = any> = Parameters<AxiosInterceptorManager<T>['use']>

type OnFulfilled<T = any> = AxiosInterceptor<T>[0]
type OnRejected<T =any> = AxiosInterceptor<T>[1]

type Interceptor<T = any> = [OnFulfilled<T>, OnRejected<T>?]

export type RequestInterceptor=Interceptor<AxiosRequestConfig> 
export type ResponseInterceptor=Interceptor<AxiosResponse> 