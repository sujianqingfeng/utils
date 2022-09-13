import { describe, it, expect } from 'vitest'
import { createMethodsByArray } from '../method'

describe('method', () => {
  it('createMethodsByArray ', () => {
    const keys = ['a', 'b'] 
    const gen = (key:string) => {
      return (one:string, two:number) => {
        return `${key} ${one} ${two}`
      }
    }
    const ms = createMethodsByArray(keys, gen)
    expect(ms.a(1111, 222)).toMatchInlineSnapshot('"a 1111 222"') 
  })

})

