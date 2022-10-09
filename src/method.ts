type MethodMap = (key: string) => (...rest: any) => any
type ReduceReturnType = Record<string, (...rest: any) => any>

export function createMethodsByArray(keys: string[], map: MethodMap) {
  const methods = keys.reduce<ReduceReturnType>((pre, key) => {
    pre[key] = map(key)
    return pre
  }, {})
  return methods
}