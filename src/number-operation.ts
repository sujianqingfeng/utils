import big, { BigSource, Big } from 'big.js'
import { isObject, isUndefined } from './basic'

/**
 * 加
 *
 * @param {*} one
 * @param {*} two
 * @returns
 */
export function plus(one:BigSource, two:BigSource) {
  return big(one).plus(two).toNumber()
}

/**
 * 减
 *
 * @param {*} one
 * @param {*} two
 * @returns
 */
export function minus(one:BigSource, two:BigSource) {
  return big(one).minus(two).toNumber()
}

/**
 * 乘
 *
 * @param {*} one
 * @param {*} two
 * @param {*} round
 * @returns
 */
export function times(one:BigSource, two:BigSource, round = 2) {
  return big(one).times(two).round(round).toNumber()
}

/**
 * 除
 *
 * @param {*} one
 * @param {*} two
 * @param {*} round
 * @returns
 */
export function div(one:BigSource, two:BigSource, round = 2) {
  return big(one).div(two).round(round).toNumber()
}

type SumOption = {
  map?:(item: Record<string, any>) => BigSource
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

  const total =  arr.reduce((pre, cur) => {
    if (isObject(cur)) {
      if (!isUndefined(map)) {
        cur = map(cur)
      } else {
        throw new Error('sum method need map option')
      }
    }
    return big(pre as BigSource).plus(cur as BigSource) 
  }, 0) as Big

  return total.round(round).toNumber()
}
