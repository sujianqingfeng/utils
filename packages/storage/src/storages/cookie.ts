import { getCookie, setCookie } from '@sujian/utils-shared'
import type { Storage } from '../types'

const COOKIE_KEY =  '__cookie_key__'

const parseJson = (str: string) => {
  try {
    const json = JSON.parse(str)
    return { json }
  } catch (error) {
    return { error }
  }
}

const getCurrentWrapperJson = () => {
  const str = getCookie(COOKIE_KEY) || '{}'
  return parseJson(str)
} 

const updateStorage = (value: any) => {
  setCookie(COOKIE_KEY, JSON.stringify(value))
}

const getItem = (key: string) => {
  const { json, error } = getCurrentWrapperJson()
  if (error) {
    return undefined
  }
  return json[key]
}

const setItem = (key: string, value: any) => {
  const { json = {} } = getCurrentWrapperJson() 
  json[key] = value 

  updateStorage(json)
}

const removeItem = (key: string) => {
  const { json = {} } = getCurrentWrapperJson() 
  delete json[key] 

  updateStorage(json)
}

const clear = () => {
  updateStorage({})
}

export const cookieStorage: Storage = {
  getItem,
  setItem,
  removeItem,
  clear
}