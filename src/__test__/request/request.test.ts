import { describe, it, expect } from 'vitest'
import { request } from './index'

describe.skip('request', () => {
  it('normal', async() => {
    const result =  await request.get('https://reqres.in/api/users?page=1')  
    expect(result.support.text).toMatch('To keep ReqRes free')
  })

  it('404', async () => {
    await expect(request.get('https://reqres.in/api/unknown/23')).rejects.toMatchInlineSnapshot('[AxiosError: Request failed with status code 404]')
  })
})