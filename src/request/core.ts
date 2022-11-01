import axios, { AxiosRequestConfig } from 'axios'
import type { CreateAxiosDefaults } from 'axios'
import type { CreateAxiosInterceptor } from './types'

const defaultAxiosConfig:CreateAxiosDefaults = {
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
}

export function createAxios(axiosConfig: CreateAxiosDefaults, interceptor?:CreateAxiosInterceptor ) {

  const { requests = [], responses = [] } = interceptor || { requests: [], responses: [] }

  const finalAxiosConfig = { ...defaultAxiosConfig, ...axiosConfig }
  const axiosInstance = axios.create(finalAxiosConfig)

  requests.reverse().forEach(request =>
    axiosInstance.interceptors.request.use(...request))
  
  responses.forEach(response => axiosInstance.interceptors.response.use(...response))

  const requestInstance = {
    getAxiosInstance() {
      return axiosInstance
    },
    get<T>(url:string, params?:any, config?:AxiosRequestConfig) {
      return axiosInstance.get<T>(url, {
        params,
        ...config
      })
    },
    post(url:string, data?:any, config?:AxiosRequestConfig) {
      return axiosInstance.post(url, data, config)
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