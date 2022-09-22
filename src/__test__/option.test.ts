import { describe, it, expect } from 'vitest'
import { createOption, mapOption, insertOption, getLabel } from '../option'

describe('option', () => {
  it('createOption', () => {
    const option =  createOption('label', 'value')
    expect(option).toMatchInlineSnapshot(`
      {
        "label": "label",
        "value": "value",
      }
    `)
  })

  it('mapOption', () => {
    const examples = [{ a: '1', b: 2 }]

    const options = examples.map(mapOption('a', 'b')) 
    expect(options ).toMatchInlineSnapshot(`
      [
        {
          "label": "1",
          "value": 2,
        },
      ]
    `)
  })

  it('insertOption', () => {
    const option =  createOption('label', 'value')
    const options = [option]
    insertOption(options)
    expect(options).toMatchInlineSnapshot(`
      [
        {
          "label": "全部",
          "value": "",
        },
        {
          "label": "label",
          "value": "value",
        },
      ]
    `)
  })

  it('getLabel', () => {
    const options = [createOption('label', 'value'), createOption('1', 2)]
    expect(getLabel(options, 'value')).toEqual('label')

    const map = {
      'value': 'label'
    }

    expect(getLabel(options, 'value')).toEqual('label')
    expect(getLabel(map, 'value')).toEqual('label')
  })
})