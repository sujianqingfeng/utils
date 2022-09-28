export const getCookie = (key: string) => {
  const current = document.cookie.split('; ').find(v => v.startsWith(`${key}=`))
  if (current) {
    const [, val] = current.split('=')
    const possible =  decodeURIComponent(val.trim())
    return possible
  }
  return undefined
}

export const setCookie = (key: string, value: any) => {
  document.cookie = `${key}=${encodeURIComponent(value)}`
}

export const delCookie = (key: string) => {
  document.cookie = `${key}=del; expires=Thu, 01 Jan 1970 00:00:01 GMT`
}