type Value =  string | number | boolean | null

interface Option {
  label:string,
  value?:Value
}

export function createOption(label:string, value?:Value):Option {
  return { label, value } 
}

export function mapOption(labelKey:string, valueKey?:string) {
  return (item:Record<string, any>) => createOption(item[labelKey], valueKey ? item[valueKey] : null)
}

export function addEmptyOption(options:Option[], label = '全部', value:Value = '') {
  options.unshift(createOption(label, value))
  return options
}

