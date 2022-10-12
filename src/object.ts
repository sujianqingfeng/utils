import { isString } from './basic'

export function objectTrim(obj: Record<string, any>, keys?:string[]) {

  const data = { ...obj }

  Object.keys(data).forEach(key => {
    if (!keys || keys.includes(key) ) {
      if (isString(data[key])) { 
        data[key] = data[key].trim() 
      }
    }
  })

  return data
}