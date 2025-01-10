import type { IBaseField } from './base'

export interface IMultipleSelectField extends IBaseField {
  type: 'MultipleSelect'
  options: string[]
}
