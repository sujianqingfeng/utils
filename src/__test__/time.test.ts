import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'
import { getMonthRangeTime, getWeekRangeTime, getCurrentWeekRangeTime, getCurrentMonthRangeTime, DEFAULT_FORMAT } from '../time'

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

  it('getCurrentWeekRangeTime', () => {
    const ans = [`${dayjs().startOf('week').format(DEFAULT_FORMAT)  }`, `${dayjs().format(DEFAULT_FORMAT)  }`]
    expect(getCurrentWeekRangeTime()).toEqual(ans)
  })

  it('getCurrentMonthRangeTime', () => {
    const format = 'YYYY-MM-DD HH:mm:ss'
    const ans = [`${dayjs().startOf('month').format(DEFAULT_FORMAT)  } 00:00:00`, `${dayjs().format(DEFAULT_FORMAT)  } 23:59:59`]
    expect(getCurrentMonthRangeTime({ format })).toEqual(ans)
  })
})