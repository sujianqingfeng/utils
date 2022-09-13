type Value =  string | number | boolean | null

interface Label {
  label:string,
  value?:Value
}

export function createOption(label:string, value?:Value):Label {
  return { label, value } 
}

export function mapOption(labelKey:string, valueKey?:string) {
  return (item:Record<string, any>) => createOption(item[labelKey], valueKey ? item[valueKey] : null)
}