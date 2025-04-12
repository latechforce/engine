import type { RollupFieldConfig } from '/domain/entities/Field/Rollup'

/**
 * Rollup field interface
 * @title Rollup field
 * @description Represents a field that aggregates data from linked records
 * @example
 * {
 *   type: 'Rollup',
 *   name: 'totalSales',
 *   required: false,
 *   multipleLinkedRecord: 'orders',
 *   linkedRecordField: 'amount',
 *   formula: 'sum(amount)',
 *   output: {
 *     type: 'Number',
 *     name: 'totalSales',
 *   }
 * }
 */
export type RollupFieldSchema = Omit<RollupFieldConfig, 'multipleLinkedRecord'> & {
  multipleLinkedRecord: string
}
