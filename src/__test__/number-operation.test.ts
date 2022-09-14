import { describe, it, expect } from 'vitest'

import { plus, minus, times, div, sum } from '../number-operation'

describe('number-operation', () => {
  it('plus', () => {
    expect(plus(0.1, 0.2)).toEqual(0.3)
  })

  it('plus', () => {
    expect(minus(1, 0.9)).toEqual(0.1)
  })

  it('times', () => {
    expect(times(0.6, 3)).toEqual(1.8)
  })

  it('div', () => {
    expect(div(355, 113)).toEqual(3.14)
  })

  it('sum', () => {
    expect(sum([1, 2, 3])).toEqual(6)
    expect(() => sum([{}, {}, {}])).toThrowError('need map')
    expect(sum([{ val: 1 }, { val: 2 }, { val: 3 }], { map: (item) => item.val })).toEqual(6)
  })
})