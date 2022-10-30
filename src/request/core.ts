import axios from 'axios'
import type { CreateAxiosDefaults } from 'axios'

const defaultAxiosConfig:CreateAxiosDefaults = {
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
}

export function createAxios(axiosConfig: CreateAxiosDefaults) {

  const finalAxiosConfig = { ...defaultAxiosConfig, ...axiosConfig }
  const axiosInstance = axios.create(finalAxiosConfig)


  axiosInstance.interceptors.request.use()

  const requestInstance = {
    getAxiosInstance() {
      return axiosInstance
    }
  }

  return requestInstance
}