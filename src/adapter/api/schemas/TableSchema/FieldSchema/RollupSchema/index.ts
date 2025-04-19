import type { OutputRollupFieldTableSchema } from './OutputSchema'
import type { RollupFieldConfig } from '/domain/entities/Field/Rollup'

/**
 * Rollup field interface
 * @title Rollup
 * @description Represents a field that aggregates values from linked records.
 */
export type RollupFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: RollupFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: RollupFieldConfig['type']
  /**
   * Field formula
   * @title Formula
   * @description The formula expression to calculate the aggregated value.
   */
  formula: RollupFieldConfig['formula']
  /**
   * Multiple linked record field
   * @title Multiple Linked Record
   * @description The name of the multiple linked record field to aggregate values from.
   */
  multipleLinkedRecord: string
  /**
   * Linked record field
   * @title Linked Record Field
   * @description The name of the field in the linked record table to aggregate values from.
   */
  linkedRecordField: RollupFieldConfig['linkedRecordField']
  /**
   * Field output
   * @title Output
   * @description The output type configuration for the rollup field.
   */
  output: OutputRollupFieldTableSchema
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: RollupFieldConfig['required']
}
