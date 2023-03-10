import { getTypeClassName, hasOwn } from '../../basic'
import type { Context, BeforeFn, Options } from '../types'

export type TypeConfig = {
  removeType?: boolean
} & Partial<Exclude<Options, 'interceptor'>>

export const createType = () => {
  const TYPE = '__type__'

  const isType = (context: Context) => {
    const { config } = context
    const { removeType } = config as TypeConfig
    const isType =
      removeType === undefined ? true : !removeType
    return isType
  } 

  // 写入
  const createWrite: BeforeFn = (context: Context) => {
    return (value) => {
      if (!isType(context)) {
        return value
      }
      
      const type = getTypeClassName(value)
      const data = { value, [TYPE]: type }
      return JSON.stringify(data)
    }
  }

  // 读取
  const createRead: BeforeFn = (context: Context) => {
    return (value) => {
      if (!isType(context)) {
        return value
      }
      try {
        const json = JSON.parse(value)
        if (hasOwn(json, TYPE)) {
          return json.value
        }
        return value
      } catch (error) {
        return value
      }
    }
  }

  return {
    typeWrite: createWrite,
    typeRead: createRead
  }
}