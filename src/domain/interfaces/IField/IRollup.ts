import type { IBaseField } from './base'
import type { IOutputField } from './IOutput'

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
export interface IRollupField extends IBaseField {
  type: 'Rollup'
  multipleLinkedRecord: string
  linkedRecordField: string
  formula: string
  output: IOutputField
}
