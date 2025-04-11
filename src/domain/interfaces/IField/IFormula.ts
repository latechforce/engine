import type { IBaseField } from './base'
import type { IOutputField } from './IOutput'

/**
 * Formula field interface
 * @title Formula field
 * @description Represents a calculated field in forms and tables
 * @example
 * {
 *   type: 'Formula',
 *   name: 'totalPrice',
 *   formula: 'price * quantity',
 * }
 */
export interface IFormulaField extends IBaseField {
  type: 'Formula'
  formula: string
  output: IOutputField
}
