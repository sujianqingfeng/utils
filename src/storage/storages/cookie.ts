import { Storage } from '../types'

const COOKIE_KEY = '__cookie_key__'

const getCookie = (str: string, key: string, cookieKey: string = COOKIE_KEY) => {
  const current = str.split(';').find(v => v.startsWith(`${cookieKey}=`))
  if (current) {
    const [, val] = current.split('=')
    const possible =  decodeURIComponent(val.trim())
    try {
      return JSON.parse(possible)[key]
    } catch (error) {
      return possible 
    }
  }
  return undefined
}

const  getItem = (key: string) => {
  return getCookie(document.cookie, key)
}

export const cookieStorage: Storage = {
  getItem
}