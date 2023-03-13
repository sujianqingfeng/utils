import { describe, it, expect } from 'vitest'
import { objectRemoveEmptyProp } from '../object'

describe('object', () => {

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