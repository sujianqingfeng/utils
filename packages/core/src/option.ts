import { isArray, isObject } from '@sujian/utils-shared'

type Value =  string | number | boolean | null

export interface Option<T = Value> {
  label: string,
  value: T 
}

/**
 * 创建option
 * 
 * @param label 
 * @param value 
 * @returns 
 */
export function createOption<T = Value>(label: string, value: T): Option<T> {
  return { label, value } 
}

/**
 * 从数组中map option
 * 
 * @param labelKey 
 * @param valueKey 
 * @returns 
 */
export function mapOption<T>(labelKey: string, valueKey?: string) {
  return (item: Record<string, any>) => createOption<T>(item[labelKey], valueKey ? item[valueKey] : null)
}

/**
 * 插入option
 * 
 * @param options 
 * @param label 
 * @param value 
 * @returns 
 */
export function insertOption(options: Option[], label = '全部', value: Value = '') {
  options.unshift(createOption(label, value))
  return options
}

/**
 * 获取label
 * 
 * @param options 
 * @param value 
 * @param defaultLabel 
 * @returns 
 */
export function getLabel(options: Option[] | Record<string, string>, value: string | number, defaultLabel = '') {
  if (isArray(options)) {
    const current = options.find(item => item.value === value)
    if (current) {
      return current.label
    }
  } else if (isObject(options)) {
    const current = options[value]
    if (current) { return current }
  }

  return defaultLabel 
}
