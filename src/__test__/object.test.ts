import { describe, it, expect } from 'vitest'
import { objectTrim, objectDefaultValue, objectRemoveEmptyProp } from '../object'

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

  it('objectDefaultValue', () => {
    const obj = { a: null, b: null, c: 1 }
    expect(objectDefaultValue(obj, { a: 1 })).toMatchInlineSnapshot(`
      {
        "a": 1,
        "b": null,
        "c": 1,
      }
    `)

    const result = objectDefaultValue(obj, { c: 2 }, (val) => val === 1)
    expect(result).toMatchInlineSnapshot(`
      {
        "a": null,
        "b": null,
        "c": 2,
      }
    `)
  })

  it('objectRemoveEmptyProp', () => {
    const obj = { a: 1, b: undefined, c: [{ c: 1, d: null, g: [1, 2, 3] }], f: [] }

    expect(objectRemoveEmptyProp(obj)).toMatchInlineSnapshot(`
      {
        "a": 1,
        "c": [
          {
            "c": 1,
            "g": [
              1,
              2,
              3,
            ],
          },
        ],
      }
    `)
  })
})