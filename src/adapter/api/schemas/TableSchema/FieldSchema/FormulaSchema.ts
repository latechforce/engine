import type { FormulaFieldConfig } from '/domain/entities/Field/Formula'

/**
 * Formula field interface
 * @title Formula
 * @description Represents a calculated field in forms and tables
 * @example
 * {
 *   type: 'Formula',
 *   name: 'totalPrice',
 *   formula: 'price * quantity',
 * }
 */
export type FormulaFieldTableSchema = FormulaFieldConfig
