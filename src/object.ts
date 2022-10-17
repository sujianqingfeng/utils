import { isNull, isString } from './basic'

type Obj = Record<string, any>

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

export function objectDefaultValue(obj:Obj, part:Partial<Obj>, valid: (val:any)=>boolean = isNull) {
  const data = { ... obj }

  Object.keys(part).forEach(key => {
    if (valid(data[key])) {
      data[key] = part[key]
    }
  })

  return data
}