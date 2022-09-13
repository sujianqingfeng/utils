/**
 * 最后一个索引
 * 
 * @param arr 
 * @returns boolean 
 */
export function getLastIndex(arr:unknown[]):number {
  return isEmpty(arr) ? 0 :  arr.length - 1
}

/**
 * 是否为空
 * 
 * @param arr 
 * @returns 
 */
export function isEmpty(arr:unknown[]): boolean {
  return arr.length === 0
}

