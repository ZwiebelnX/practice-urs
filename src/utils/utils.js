import constValue from './constValue'
import type { BackFormItem, FormItem, ApplicantRecord, ApplicantItemStruct } from './struct'

export function Back2Front (back: BackFormItem): FormItem[] {
  let desc = constValue.extensionDesc[back.extension]
  let result:FormItem = [
    {
      id: -1,
      extension: back.extension,
      name: back.name,
      type: back.type,
      unique: back.unique,
      defaultValue: back.defaultValue || '',
      description: back.description,
      tip: back.tip,
      require: back.require,
      case: back.case,
      useRange: back.range !== undefined,
      range: back.range || [0, 0],
      groupTo: undefined,
      /* subItem:
      back.subItem != undefined ? back.subItem.map((value) => Back2Front(value)) : undefined, */
      caseEditable: desc.caseEditable,
      rangeName: desc.rangeName
    }
  ]
  if (back.extension === 'group') {
    result[0].type = 'begin'
    for (let it of back.subItem) {
      result = result.concat(Back2Front(it))
    }
    let end = {
      id: -1,
      extension: back.extension,
      name: back.name,
      type: 'end',
      unique: back.unique,
      defaultValue: back.defaultValue || '',
      description: back.description,
      tip: back.tip,
      require: back.require,
      case: back.case,
      useRange: back.range !== undefined,
      range: back.range || [0, 0],
      groupTo: undefined,
      caseEditable: desc.caseEditable,
      rangeName: desc.rangeName
    }
    result[0].groupTo = end
    result.push(end)
  }
  return result
}

export function Front2Back (front: FormItem[], index: number): BackFormItem[] {
  let result:BackFormItem = []
  for (let i = index; i < front.length; i++) {
    let it = front[i]
    let res :BackFormItem = {
      extension: it.extension,
      name: it.name,
      type: it.type,
      unique: it.unique,
      defaultValue: it.defaultValue || undefined,
      description: it.description,
      tip: it.tip,
      require: it.require,
      case: it.caseEditable ? it.case : undefined,
      range: it.useRange ? it.range : undefined,
      subItem: undefined
      // front.subItem != undefined ? front.subItem.map((value) => Front2Back(value)) : undefined
    }
    if (it.extension === 'group') {
      if (it.type === 'end') {
        break
      } else if (it.type === 'begin') {
        res.type = 'group'
        res.subItem = Front2Back(front, i + 1)
        i += res.subItem.length + 1
      }
    }
    result.push(res)
  }
  return result
  /* return {
      extension: front.extension,
      name: front.name,
      type: front.type,
      unique: front.unique,
      defaultValue: front.defaultValue || undefined,
      description: front.description,
      tip: front.tip,
      require: front.require,
      case: front.caseEditable ? front.case : undefined,
      range: front.useRange ? front.range : undefined,
      subItem:
          front.subItem != undefined ? front.subItem.map((value) => Front2Back(value)) : undefined
  } */
}

function flatApplicant (base: string, item: ApplicantRecord) {
  let result: { key: string; value: string }[] = []
  for (let it of Object.keys(item)) {
    switch (typeof item[it]) {
      case 'string':
        result.push({
          key: base + it,
          value: item[it].toString()
        })
        break
      case 'number':
        result.push({
          key: it,
          value: item[it].toString()
        })
        break
      case 'object':
        result.push(...flatApplicant(it + ' > ', item[it]))
    }
  }
  return result
}

export function transToXlsx (item: ApplicantItemStruct) {
  let arr = [{ key: 'id', value: item.id }]
  arr.push(...flatApplicant('', item.data))
  let result: { [x: string]: string } = {}
  for (let it of arr) {
    result[it.key] = it.value
  }
  return result
}
