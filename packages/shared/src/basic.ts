export function getTypeClassName(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1)
}

function isType(value: unknown, type: string): boolean {
  return getTypeClassName(value) === type
}

export function isFunction(value: unknown): boolean {
  return isType(value, 'Function') 
}

export function isObject(value: unknown): value is object {
  return isType(value, 'Object')
}

export function isString(value: unknown): value is string {
  return isType(value, 'String') 
}

export function isNull(value: unknown): value is null {
  return isType(value, 'Null')
}

export function isUndefined(value: unknown): value is undefined {
  return isType(value, 'Undefined')
}

export function isDate(value: unknown): value is Date {
  return isType(value, 'Date')
}

export function isRegExp(value: unknown): value is RegExp {
  return isType(value, 'RegExp')
}

export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value) 
}

export function isPromise<T>(value: unknown): value is Promise<T> {
  if (isObject(value)) {
    const then = (value as any).then 
    return then && isFunction(then) 
  }
  return false
}

export function isError(value: unknown): value is Error {
  return value instanceof Error 
}

export function hasOwn(obj: object, key: string | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * 包装promise
 * 
 * @param promiseFn 
 * @returns 
 */
export function createTryWrapper<R = any, T extends any[] = any[]>(
  promiseFn: (...rest: T) => Promise<R>
) {
  if (!isFunction(promiseFn)) {
    throw new Error('createTryWrapper: promiseFn must be a function')
  }
  return async (...rest: Parameters<typeof promiseFn>): Promise<[true, R] | [false, any]> => {
    try {
      const data = await promiseFn(...rest)
      return [true, data]
    } catch (error) {
      return [false, error]
    }
  }
}