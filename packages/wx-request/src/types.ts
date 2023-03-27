export type RequestOption = WechatMiniprogram.RequestOption & {[key:string]:any}  

export type RequestConfig = Record<string, any>

export interface RequestContext {
  requestOption:RequestOption  
  response:any
  config:RequestConfig
}

export type ReqInterceptor = (context:RequestContext) => RequestContext | Promise<RequestContext> | void
export type RespInterceptor = (context:RequestContext) => Error | void

export type ErrorMessageInterceptorOptions = {
  isInvalid:(context: RequestContext )=>string | undefined 
  showMessage:(msg:string)=>void
}

export type ExtractDataInterceptorOptions = {
  extract?:(res:any)=>any
}