import { describe, it, expect } from 'vitest'
import { getCookie, setCookie, delCookie } from '../cookie'

describe('cookie', () => {
  it('setCookie', () => {
    setCookie('test', 'test')
    expect(document.cookie).toMatchInlineSnapshot('"test=test"')
  })

  it('getCookie', () => {
    document.cookie = 'name=111'
    const result =  getCookie('name')
    expect(result).toMatchInlineSnapshot('"111"')
  })

  it('delCookie', () => {
    document.cookie = 'del=test'
    delCookie('del')
    expect(document.cookie).not.toContain('del')
  })
})