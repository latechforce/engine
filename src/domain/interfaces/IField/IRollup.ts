import type { IBaseField } from './base'
import type { IOutputField } from './IOutput'

export interface IRollupField extends IBaseField {
  type: 'Rollup'
  multipleLinkedRecord: string
  linkedRecordField: string
  formula: string
  output: IOutputField
}
