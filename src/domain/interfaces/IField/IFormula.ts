import type { IBaseField } from './base'
import type { IOutputField } from './IOutput'

export interface IFormulaField extends IBaseField {
  type: 'Formula'
  formula: string
  output: IOutputField
}
