import { describe, it, expect } from 'vitest'
import { request } from './index'

describe('request', () => {
  it('normal', async () => {
    const result =  await request.get('https://reqres.in/api/users?page=1')  
    expect(result.support.text).toMatch('To keep ReqRes free')
  })
})