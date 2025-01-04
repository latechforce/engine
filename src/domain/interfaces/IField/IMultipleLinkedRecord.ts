import type { IBaseField } from './base'

export interface IMultipleLinkedRecordField extends IBaseField {
  type: 'MultipleLinkedRecord'
  table: string
}
