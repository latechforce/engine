import type { LongTextFieldConfig } from '/domain/entities/Field/LongText'

/**
 * Long text field interface
 * @title Long text
 * @description Represents a field that stores multiple lines of text
 * @example
 * {
 *   type: 'LongText',
 *   name: 'description',
 *   required: true
 * }
 */
export type LongTextFieldTableSchema = LongTextFieldConfig
