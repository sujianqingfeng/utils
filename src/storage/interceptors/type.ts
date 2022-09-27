import { getTypeClassName, hasOwn } from '../../basic'
import type { Context, BeforeFn } from '../types'

export const REMOVE_TYPE = '_remove_type'

export const createType = () => {
  const TYPE = '__type__'

  const createWrite: BeforeFn = (context: Context) => {
    const { config } = context
    const isType =
      config[REMOVE_TYPE] === undefined ? true : !config[REMOVE_TYPE]

    return (value) => {
      if (!isType) {
        return value
      }
      
      const type = getTypeClassName(value)
      const data = { value, [TYPE]: type }
      return JSON.stringify(data)
    }
  }

  const createRead: BeforeFn = (context: Context) => {
    const { config } = context
    const isType =
      config[REMOVE_TYPE] === undefined ? true : !config[REMOVE_TYPE]

    return (value) => {
      if (!isType) {
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