import type { SingleSelectFieldConfig } from '/domain/entities/Field/SingleSelect'

/**
 * Single select field interface
 * @title Single select
 * @description Represents a field that allows selecting a single option from a predefined list.
 */
export type SingleSelectFieldTableSchema = {
  name: SingleSelectFieldConfig['name']
  type: SingleSelectFieldConfig['type']
  options: SingleSelectFieldConfig['options']
  /**
   * @default '`false`'
   */
  required?: SingleSelectFieldConfig['required']
}
