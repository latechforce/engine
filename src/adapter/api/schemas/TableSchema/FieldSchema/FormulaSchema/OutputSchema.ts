import type { FormulaFieldConfig } from '/domain/entities/Field/Formula'

/**
 * Formula field output interface
 * @title Output
 * @description Represents the output type configuration of a formula field.
 */
export type OutputFormulaFieldTableSchema = {
  /**
   * Output type
   * @title Type
   * @description The type of the output field.
   */
  type: FormulaFieldConfig['output']['type']
}
