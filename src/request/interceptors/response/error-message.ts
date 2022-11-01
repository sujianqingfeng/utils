import type { AxiosError, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import type { ErrorMessageInterceptorOptions, ResponseInterceptor } from '../../types'

export const SHOW_ERROR_MESSAGE_KEY = '_showErrorMessage'

const isShowErrorMessage = (config:AxiosRequestConfig) => {
  const temp = config[SHOW_ERROR_MESSAGE_KEY]
  return temp === undefined ? true : temp
}

export function createErrorMessageInterceptor(options:ErrorMessageInterceptorOptions):ResponseInterceptor {

  const {
    isInvalid,
    showMessage
  } = options

  return [
    (res) => {
      const message = isInvalid(res)
      if (message) {
        const isShow = isShowErrorMessage(res.config)
        isShow && showMessage(message)
        return Promise.reject(new Error(message))
      }

      return Promise.resolve(res)
    },
    (error:AxiosError) => {
      const isCancel = axios.isCancel(error)
      const isShow = isShowErrorMessage(error.config!)

      if (!isCancel && isShow) {
        showMessage(error) 
      }

      return Promise.reject(error)
    }
  ]
}