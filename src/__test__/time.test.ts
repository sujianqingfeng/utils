import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'
import { getMonthRangeTime, getWeekRangeTime, getCurrentWeekToNowRangeTime, getCurrentMonthToNowRangeTime, DEFAULT_FORMAT, getCurrentYearToNowRangeTime, getYearRangeTime, } from '../time'

describe('time', () => {
  it('getWeekRangeTime', () => {
    const format = 'YYYY-MM-DD HH:mm:ss'
    const ans = [`${dayjs().subtract(1, 'week').format(DEFAULT_FORMAT)  } 00:00:00`, `${dayjs().format(DEFAULT_FORMAT)  } 23:59:59`]
    expect(getWeekRangeTime({ format })).toEqual(ans)
  })

  it('getMonthRangeTime', () => {
    const ans = [`${dayjs().subtract(1, 'month').format(DEFAULT_FORMAT)  }`, `${dayjs().format(DEFAULT_FORMAT)  }`]
    expect(getMonthRangeTime()).toEqual(ans)
  })

  it('getYearRangeTime', () => {
    const ans = [`${dayjs().subtract(1, 'year').format(DEFAULT_FORMAT)  }`, `${dayjs().format(DEFAULT_FORMAT)  }`]
    expect(getYearRangeTime()).toEqual(ans)
  })

  it('getCurrentWeekToNowRangeTime', () => {
    const ans = [`${dayjs().startOf('week').format(DEFAULT_FORMAT)  }`, `${dayjs().format(DEFAULT_FORMAT)  }`]
    
    expect(getCurrentWeekToNowRangeTime()).toEqual(ans)
  })

  it('getCurrentMonthToNowRangeTime', () => {
    const format = 'YYYY-MM-DD HH:mm:ss'
    const ans = [`${dayjs().startOf('month').format(DEFAULT_FORMAT)  } 00:00:00`, `${dayjs().format(DEFAULT_FORMAT)  } 23:59:59`]
    expect(getCurrentMonthToNowRangeTime({ format })).toEqual(ans)
  })

  it('getCurrentYearToNowRangeTime', () => {
    const format = 'YYYY-MM-DD HH:mm:ss'
    const ans = [`${dayjs().startOf('year').format(DEFAULT_FORMAT)  } 00:00:00`, `${dayjs().format(DEFAULT_FORMAT)  } 23:59:59`]
    expect(getCurrentYearToNowRangeTime({ format })).toEqual(ans)
  })
  
})