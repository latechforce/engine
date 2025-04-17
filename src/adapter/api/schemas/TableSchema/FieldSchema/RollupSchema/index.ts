import type { OutputRollupFieldTableSchema } from './OutputSchema'
import type { RollupFieldConfig } from '/domain/entities/Field/Rollup'

/**
 * Rollup field interface
 * @title Rollup
 * @description Represents a field that aggregates values from linked records.
 */
export type RollupFieldTableSchema = {
  name: RollupFieldConfig['name']
  type: RollupFieldConfig['type']
  formula: RollupFieldConfig['formula']
  /**
   * @description The multiple linked record field to aggregate values from.
   */
  multipleLinkedRecord: string
  /**
   * @description The field of the multiple linked record table to aggregate values from.
   */
  linkedRecordField: RollupFieldConfig['linkedRecordField']
  /**
   * @description The output type of the rollup field.
   */
  output: OutputRollupFieldTableSchema
  /**
   * @default '`false`'
   */
  required?: RollupFieldConfig['required']
}
