import { describe, it, expect } from 'vitest'
import { isFunction, isString, isDate, isNull, isObject, isRegExp, isUndefined } from '../basic'

describe('basic', () => {

  it('isFunction', () => {
    expect(isFunction(isFunction)).toBeTruthy()
    expect(isFunction({})).toBeFalsy()
  })

  it('isString', () => {
    expect(isString('')).toBeTruthy()
    expect(isString(null)).toBeFalsy()
    expect(isString(111)).toBeFalsy()
  })

  it('isDate', () => {
    expect(isDate(new Date())).toBeTruthy()
    expect(isDate(null)).toBeFalsy()
  })

  it('isNull', () => {
    expect(isNull(null)).toBeTruthy()
    expect(isNull(new Date())).toBeFalsy()
  })

  it('isObject', () => {
    expect(isObject({})).toBeTruthy()
    expect(isObject(new Date())).toBeFalsy()
  })

  it('isRegExp', () => {
    expect(isRegExp(/f/)).toBeTruthy()
    expect(isRegExp(new Date())).toBeFalsy()
  })

  it('isUndefined', () => {
    expect(isUndefined(undefined)).toBeTruthy()
    expect(isUndefined(999)).toBeFalsy()
  })

})