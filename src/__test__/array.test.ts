import { describe, it, expect } from 'vitest'

import { sum } from '../array'

describe('array', () => {
  it('sum', () => {
    expect(sum(1, 2)).toEqual(3)
  })
})