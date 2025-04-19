import type { OutputFormulaFieldTableSchema } from './OutputSchema'
import type { FormulaFieldConfig } from '/domain/entities/Field/Formula'

/**
 * Formula field interface
 * @title Formula
 * @description Represents a field that calculates a value based on a formula.
 */
export type FormulaFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: FormulaFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: FormulaFieldConfig['type']
  /**
   * Field formula
   * @title Formula
   * @description The formula expression to calculate the field value.
   */
  formula: FormulaFieldConfig['formula']
  /**
   * Field output
   * @title Output
   * @description The output type configuration for the formula field.
   */
  output: OutputFormulaFieldTableSchema
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: FormulaFieldConfig['required']
}
