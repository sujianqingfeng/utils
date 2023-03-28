import type { AxiosError, AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios'

export type AxiosInterceptor<T = any> = Parameters<AxiosInterceptorManager<T>['use']>

export type ReqInterceptor=AxiosInterceptor<AxiosRequestConfig> 
export type RespInterceptor=AxiosInterceptor<AxiosResponse> 

export type RedirectInterceptorOptions = {
  isRedirect: (res: AxiosResponse) => string|undefined
}

export type ErrorMessageInterceptorOptions = {
  isInvalid: (res: AxiosResponse) => string | undefined 
  showMessage: (msg: string | AxiosError) => void
}

export type ExtractDataInterceptorOptions = {
  extract?: (res: AxiosResponse) => any
}

