import type { DateTimeFieldConfig } from '/domain/entities/Field/DateTime'

/**
 * Date time field interface
 * @title Date time
 * @description Represents a field that stores a date and time.
 */
export type DateTimeFieldTableSchema = {
  name: DateTimeFieldConfig['name']
  type: DateTimeFieldConfig['type']
  /**
   * @default '`false`'
   */
  required?: DateTimeFieldConfig['required']
}
