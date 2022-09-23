import dayjs, { Dayjs, ManipulateType } from 'dayjs'

const DEFAULT_FORMAT = 'YYYY-MM-DD'

type RangeOptions = {
  value?:number,
  format?:string
}

/**
 * 格式化dayjs格式时间
 * 
 * @param source 
 * @param format 
 * @returns 
 */
export function formatDayjs(source:Dayjs, format:string = DEFAULT_FORMAT) {
  return source.format(format)
}

export function getRangeTime(type:ManipulateType, options:RangeOptions = {}) {
  const { value = 1, format = DEFAULT_FORMAT } = options
  const times = [formatDayjs(dayjs().subtract(value, type).startOf('day'), format), formatDayjs(dayjs().endOf('day'), format)]
  return times
}

/**
 * 过去一周区间
 * 
 * @param options 
 * @returns 
 */
export function getWeekRangeTime(options:RangeOptions = {}) {
  return getRangeTime('week', options)
}

/**
 * 过去一月区间
 * 
 * @param options 
 * @returns 
 */
export function getMonthRangeTime(options:RangeOptions = {}) {
  return getRangeTime('month', options)
}

/**
 * 过去一年区间
 * 
 * @param options 
 * @returns 
 */
export function getYearRangeTime(options:RangeOptions = {}) {
  return getRangeTime('year', options)
}

export function getCurrentRangeTime(type:ManipulateType,  options:Exclude<RangeOptions, 'value'> = {}) {
  const {  format = DEFAULT_FORMAT } = options
  const times = [formatDayjs(dayjs().startOf(type), format), formatDayjs(dayjs().endOf('day'), format)]
  return times
}

/**
 * 本周区间
 * 
 * @param options 
 * @returns 
 */
export function getCurrentWeekRangeTime( options:Exclude<RangeOptions, 'value'> = {}) { 
  return getCurrentRangeTime('week', options) 
}

/**
 * 本月区间
 * 
 * @param options 
 * @returns 
 */
export function getCurrentMonthRangeTime(options:Exclude<RangeOptions, 'value'> = {}) {
  return getCurrentRangeTime('month', options)
}

/**
 * 本年区间
 * 
 * @param options 
 * @returns 
 */
export function getCurrentYearRangeTime(options:Exclude<RangeOptions, 'value'> = {}) {
  return getCurrentRangeTime('year', options)
}

export {
  DEFAULT_FORMAT
}