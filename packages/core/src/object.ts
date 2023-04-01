import { isNull, isString } from '@sujian/utils-shared'

type Obj = Record<string, any>

/**
 * 清空两边空格
 * 
 * @param obj 
 * @param keys 
 * @returns 
 */
export function objectTrim(obj: Record<string, any>, keys?: string[]) {

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

/**
 * 默认值
 * 
 * @param obj 
 * @param part 
 * @param valid 
 * @returns 
 */
export function objectDefaultValue(obj: Obj, part: Partial<Obj>, valid: (val: any) => boolean = isNull) {
  const data = { ... obj }

  Object.keys(part).forEach(key => {
    if (valid(data[key])) {
      data[key] = part[key]
    }
  })

  return data
}

type MergeIntoLeftOption = {
  otherKeys?: string[]
}

/**
 * 右边合并入左边
 * 
 * @param left 
 * @param right 
 * @param option 
 */
export function mergeIntoLeft(left: Obj, right: Obj, option: MergeIntoLeftOption = {}) {
  const { otherKeys = [] } = option
  const keys = [...otherKeys, ...Object.keys(left)]
  keys.forEach(key => {
    const rightVal = right[key] 
    left[key] = rightVal
  })
}