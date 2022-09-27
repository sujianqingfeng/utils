export const getCookie = (key: string) => {
  const cookie = document.cookie
  const current = cookie .split(';').find(v => v.startsWith(`${key}=`))
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
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}