import { describe, it, expect } from 'vitest'
import { formatMoney } from '../format'

describe('format', () => {
  it('formatMoney ', () => {
    expect(formatMoney(100000000000)).toMatchInlineSnapshot('"100,000,000,000"')
    expect(formatMoney(10000000, { symbol: '￥' })).toMatchInlineSnapshot('"￥10,000,000.00"')
  })
})