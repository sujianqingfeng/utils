import big, { Big } from 'big.js'

/**
 * 加
 *
 * @param {*} one
 * @param {*} two
 * @returns
 */
export function plus(one:Big, two:Big) {
  return big(one).plus(two).toNumber()
}

/**
 * 减
 *
 * @param {*} one
 * @param {*} two
 * @returns
 */
export function minus(one:Big, two:Big) {
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
export function times(one:Big, two:Big, round = 2) {
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
export function div(one:Big, two:Big, round = 2) {
  return big(one).div(two).round(round).toNumber()
}
