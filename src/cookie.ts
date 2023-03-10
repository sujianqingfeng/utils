/**
 * 获取cookie
 * 
 * @param key 
 * @returns 
 */
export const getCookie = (key: string) => {
  const current = document.cookie.split('; ').find(v => v.startsWith(`${key}=`))
  if (current) {
    const [, val] = current.split('=')
    const possible =  decodeURIComponent(val.trim())
    return possible
  }
  return undefined
}

/**
 * 设置cookie
 * 
 * @param key 
 * @param value 
 */
export const setCookie = (key: string, value: any) => {
  document.cookie = `${key}=${encodeURIComponent(value)}`
}

/**
 * 删除
 * 
 * @param key 
 */
export const delCookie = (key: string) => {
  document.cookie = `${key}=del; expires=Thu, 01 Jan 1970 00:00:01 GMT`
}