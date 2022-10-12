import { describe, it, expect } from 'vitest'
import { objectTrim } from '../object'

describe('object', () => {
  it('objectTrim', () => {
    const obj = { a: '  i   fdf   ', b: 1, c: '  2' }
    const result = objectTrim(obj)
    expect(result).toMatchInlineSnapshot(`
      {
        "a": "i   fdf",
        "b": 1,
        "c": "2",
      }
    `)

    const result2 = objectTrim(obj, ['a'])
    expect(result2).toMatchInlineSnapshot(`
      {
        "a": "i   fdf",
        "b": 1,
        "c": "  2",
      }
    `)
  })
})