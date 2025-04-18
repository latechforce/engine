import type { OutputFormulaFieldTableSchema } from './OutputSchema'
import type { FormulaFieldConfig } from '/domain/entities/Field/Formula'

/**
 * Formula field interface
 * @title Formula
 * @description Represents a field that calculates a value based on a formula.
 */
export type FormulaFieldTableSchema = {
  name: FormulaFieldConfig['name']
  type: FormulaFieldConfig['type']
  formula: FormulaFieldConfig['formula']
  output: OutputFormulaFieldTableSchema
  /**
   * @default '`false`'
   */
  required?: FormulaFieldConfig['required']
}
