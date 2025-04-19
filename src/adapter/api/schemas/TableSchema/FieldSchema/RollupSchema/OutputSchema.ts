import type { RollupFieldConfig } from '/domain/entities/Field/Rollup'

/**
 * Rollup field output interface
 * @title Output
 * @description Represents the output type configuration of a rollup field.
 */
export type OutputRollupFieldTableSchema = {
  /**
   * Output type
   * @title Type
   * @description The type of the output field.
   */
  type: RollupFieldConfig['output']['type']
}
