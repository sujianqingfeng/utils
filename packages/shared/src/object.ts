import { isArray, isNull, isObject, isUndefined } from './basic'

type Obj = Record<string, any>

/**
 * 清空空数据
 * 
 * @param obj 
 * @returns 
 */
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

/**
 * 判断是否有效
 * 
 * @param obj 
 * @returns 
 */
export function objectIsInvalid(obj:unknown) {
  return isNull(obj) || isUndefined(obj) || obj === '' || (isArray(obj) && !obj.length) 
}