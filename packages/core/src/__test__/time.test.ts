import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getMonthRangeTime, getWeekRangeTime, getCurrentWeekToNowRangeTime, getCurrentMonthToNowRangeTime, DEFAULT_FORMAT, getCurrentYearToNowRangeTime, getYearRangeTime, } from '../time'

describe('time', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const date = new Date(2000, 1, 1, 13)

  it('getWeekRangeTime', () => {
    const format = 'YYYY-MM-DD HH:mm:ss'
    vi.setSystemTime(date)
    expect(getWeekRangeTime({ format })).toMatchInlineSnapshot(`
      [
        "2000-01-25 00:00:00",
        "2000-02-01 23:59:59",
      ]
    `)
  })

  it('getMonthRangeTime', () => {
    vi.setSystemTime(date)
    expect(getMonthRangeTime()).toMatchInlineSnapshot(`
      [
        "2000-01-01",
        "2000-02-01",
      ]
    `)
  })

  it('getYearRangeTime', () => {
    vi.setSystemTime(date)
    expect(getYearRangeTime()).toMatchInlineSnapshot(`
      [
        "1999-02-01",
        "2000-02-01",
      ]
    `)
  })

  it('getCurrentWeekToNowRangeTime', () => {
    vi.setSystemTime(date)
    expect(getCurrentWeekToNowRangeTime()).toMatchInlineSnapshot(`
      [
        "2000-01-31",
        "2000-02-01",
      ]
    `)
  })

  it('getCurrentMonthToNowRangeTime', () => {
    vi.setSystemTime(date)
    const format = 'YYYY-MM-DD HH:mm:ss'
    expect(getCurrentMonthToNowRangeTime({ format })).toMatchInlineSnapshot(`
      [
        "2000-02-01 00:00:00",
        "2000-02-01 23:59:59",
      ]
    `)
  })

  it('getCurrentYearToNowRangeTime', () => {
    vi.setSystemTime(date)
    const format = 'YYYY-MM-DD HH:mm:ss'
    expect(getCurrentYearToNowRangeTime({ format })).toMatchInlineSnapshot(`
      [
        "2000-01-01 00:00:00",
        "2000-02-01 23:59:59",
      ]
    `)
  })
  
})