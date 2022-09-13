import { describe, it, expect } from 'vitest'

import { getLastIndex, isEmpty } from '../array'

describe('array', () => {
  it('getLastIndex', () => {
    expect(getLastIndex([])).toEqual(0)
    expect(getLastIndex([1, 2])).toEqual(1)
  })

  it('isEmpty', () => {
    expect(isEmpty([])).toBeTruthy()
    expect(isEmpty([1, 2])).toBeFalsy()
  })
})