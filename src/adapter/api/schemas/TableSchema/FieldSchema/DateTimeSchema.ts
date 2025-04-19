import type { DateTimeFieldConfig } from '/domain/entities/Field/DateTime'

/**
 * Date time field interface
 * @title Date time
 * @description Represents a field that stores a date and time.
 */
export type DateTimeFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: DateTimeFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: DateTimeFieldConfig['type']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: DateTimeFieldConfig['required']
}
