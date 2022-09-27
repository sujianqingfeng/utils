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

export function hasOwn(obj: object, key: string | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
