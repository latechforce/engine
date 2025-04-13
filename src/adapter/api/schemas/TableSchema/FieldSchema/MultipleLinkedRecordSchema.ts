import type { MultipleLinkedRecordFieldConfig } from '/domain/entities/Field/MultipleLinkedRecord'

/**
 * Multiple linked record field interface
 * @title Multiple linked record
 * @description Represents a field that can link to multiple records from another table
 * @example
 * {
 *   type: 'MultipleLinkedRecord',
 *   name: 'projects',
 *   required: true,
 *   table: 'projects'
 * }
 */
export type MultipleLinkedRecordFieldTableSchema = MultipleLinkedRecordFieldConfig
