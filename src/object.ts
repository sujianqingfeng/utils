import { isArray, isNull, isObject, isString, isUndefined } from './basic'

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

export function objectIsInvalid(obj:unknown) {
  return isNull(obj) || isUndefined(obj) || obj === '' || (isArray(obj) && !obj.length) 
}

export function objectRemoveEmptyProp(obj:any) {
  if (!isObject(obj) && !isArray(obj)) {
    return obj
  }

  const data:any = isObject(obj) ? {} : []

  if (isObject(obj)) {
    Object.keys(obj).forEach(key => {
      const value = (obj as Obj)[key]
      if (!objectIsInvalid(value)) {
        data[key] = objectRemoveEmptyProp(value)
      }
    })
  }

  if (isArray(obj)) {
    obj.forEach((o, i) => {
      data[i] = objectRemoveEmptyProp(o)
    })
  }

  return data
}