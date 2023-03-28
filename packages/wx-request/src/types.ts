export type IAnyObject = Record<string, any>
export type MaybeResult = IAnyObject | ArrayBuffer | string
export type RequestOption = WechatMiniprogram.RequestOption & {[key: string]: any}  

export type RequestSuccessCallbackResult<T extends MaybeResult = MaybeResult> = WechatMiniprogram.RequestSuccessCallbackResult<T>

export type RequestConfig = Record<string, any>

export interface RequestContext<T extends MaybeResult = MaybeResult> {
  requestOption: RequestOption  
  response?: RequestSuccessCallbackResult<T>
  config: RequestConfig
}

export type ReqInterceptor = [
  onFulfilled?:(context: RequestContext) => RequestContext | Promise<RequestContext> | undefined | null, 
  onRejected?:(error: any) => (PromiseLike<any>) | undefined | null
]

export type RespInterceptor<T = any> = [
  onFulfilled?:(res: T) => Promise<T> | T,
  onRejected?:(error: any) => (Promise<any>) | undefined | null
]

export type ErrorMessageInterceptorOptions = {
  isInvalid: (result: RequestSuccessCallbackResult) => string | undefined 
  showMessage: (msg: string) => void
}

export type ExtractDataInterceptorOptions = {
  extract?: (res: any) => any
}

export type CookieOptions = {
  saveCookie: (cookies: string[], context: RequestContext) => void
  getCookie: (context: RequestContext) => string[]
}

export type MethodFn<T extends readonly string[]> = {
  [K in T[number]]: <R>(url: string, data?: any, config?: Optional<RequestOption>) => Promise<R>
};

