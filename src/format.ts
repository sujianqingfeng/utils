import currency, { Any, Options } from 'currency.js'

/**
 * 格式化金额
 * 
 * @param val 
 * @param options 
 * @returns 
 */
export function formatMoney(val: Any, options: Options = { symbol: '', precision: 0 }) {
  return currency(val, options).format()
}

/**
 * 格式化类布尔
 * 
 * @param val 
 * @param positiveText 
 * @param negativeText 
 * @returns 
 */
export function formatBoolean(val: boolean | undefined | null, positiveText = '是', negativeText = '否') {
  return val ? positiveText : negativeText
}