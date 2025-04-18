import type { MultipleSelectFieldConfig } from '/domain/entities/Field/MultipleSelect'

/**
 * Multiple select field interface
 * @title Multiple select
 * @description Represents a field that allows selecting multiple options from a predefined list.
 */
export type MultipleSelectFieldTableSchema = {
  name: MultipleSelectFieldConfig['name']
  type: MultipleSelectFieldConfig['type']
  options: MultipleSelectFieldConfig['options']
  /**
   * @default '`false`'
   */
  required?: MultipleSelectFieldConfig['required']
}
