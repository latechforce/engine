import type { IBaseField } from './base'

export interface ISingleLinkedRecordField extends IBaseField {
  type: 'SingleLinkedRecord'
  table: string
}
