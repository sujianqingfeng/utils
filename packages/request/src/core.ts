import axios, { AxiosRequestConfig } from 'axios'
import type { CreateAxiosDefaults } from 'axios'
import type { ReqInterceptor, RespInterceptor } from './types'

const defaultAxiosConfig:CreateAxiosDefaults = {
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
}

export function createAxios(axiosConfig: CreateAxiosDefaults) {

  const finalAxiosConfig = { ...defaultAxiosConfig, ...axiosConfig }
  const axiosInstance = axios.create(finalAxiosConfig)

  const requestInstance = {
    getAxiosInstance() {
      return axiosInstance
    },
    useReqInterceptor(interceptor: ReqInterceptor) {
      axiosInstance.interceptors.request.use(...interceptor)
      return requestInstance
    },
    useRespInterceptor(interceptor: RespInterceptor) {
      axiosInstance.interceptors.response.use(...interceptor)
      return requestInstance
    },
    get<R = any>(url:string, params?:any, config?:AxiosRequestConfig) {
      return axiosInstance.get(url, {
        params,
        ...config
      }) as Promise<R>
    },
    post<R = any>(url:string, data?:any, config?:AxiosRequestConfig) {
      return axiosInstance.post(url, data, config) as Promise<R>
    },
    put(url:string, data?:any, config?:AxiosRequestConfig) {
      return axiosInstance.put(url, data, config)
    },
    delete(url:string, data?:any, config?:AxiosRequestConfig) {
      return axiosInstance.delete(url, {
        data,
        ...config
      })
    },
    head(url:string, config?:AxiosRequestConfig) {
      return axiosInstance.head(url, config)
    },
  }

  return requestInstance
}