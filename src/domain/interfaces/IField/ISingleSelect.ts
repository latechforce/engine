import type { IBaseField } from './base'

export interface ISingleSelectField extends IBaseField {
  type: 'SingleSelect'
  options: string[]
}
