type MethodMap = (key: string) => (...rest: any) => any
type ReduceReturnType = Record<string, (...rest: any) => any>

/**
 * 创建方法
 * 
 * @param keys 
 * @param map 
 * @returns 
 */
export function createMethodsByArray(keys: string[], map: MethodMap) {
  const methods = keys.reduce<ReduceReturnType>((pre, key) => {
    pre[key] = map(key)
    return pre
  }, {})
  return methods
}