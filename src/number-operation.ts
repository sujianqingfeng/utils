import currency, { Any, Options } from 'currency.js'
import { isObject, isUndefined } from './basic'

/**
 * 加
 *
 * @param {*} one
 * @param {*} two
 * @returns
 */
export function plus(one:Any, two:Any, options?: Options) {
  return currency(one, options).add(two).value
}

/**
 * 减
 *
 * @param {*} one
 * @param {*} two
 * @returns
 */
export function minus(one:Any, two:Any, options?: Options) {
  return currency(one, options).subtract(two).value
}

/**
 * 乘
 *
 * @param {*} one
 * @param {*} two
 * @param {*} round
 * @returns
 */
export function times(one:Any, two:Any, options?: Options) {
  return currency(one, options).multiply(two).value
}

/**
 * 除
 *
 * @param {*} one
 * @param {*} two
 * @param {*} round
 * @returns
 */
export function div(one:Any, two:Any, options?: Options) {
  return currency(one, options).divide(two).value
}

type SumOption = {
  map?:(item: Record<string, any>) => Any 
  round?:number
}
/**
 * 求和
 * 
 * @param arr 
 * @param options 
 * @returns 
 */
export function sum(arr:unknown[], options:SumOption = {}) {
  const { map, round = 2 } = options

  const wrapper = (value:Any) => currency(value, { precision: round })

  const total =  arr.reduce((pre, cur) => {
    if (isObject(cur)) {
      if (!isUndefined(map)) {
        cur = map(cur)
      } else {
        throw new Error('sum method need map option')
      }
    }
    return wrapper (pre as Any).add(cur as Any) 
  }, 0) as currency 

  return total.value 
}
