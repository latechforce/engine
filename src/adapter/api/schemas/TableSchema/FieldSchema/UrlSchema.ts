import type { UrlFieldConfig } from '/domain/entities/Field/Url'

/**
 * Url field interface
 * @title Url
 * @description Represents a field that stores an URL.
 */
export type UrlFieldTableSchema = {
  /**
   * Field name
   * @title Name
   * @description The name of the field.
   */
  name: UrlFieldConfig['name']
  /**
   * Field type
   * @title Type
   * @description The type of the field.
   */
  type: UrlFieldConfig['type']
  /**
   * Field required
   * @title Required
   * @description Whether the field is required.
   * @default '`false`'
   */
  required?: UrlFieldConfig['required']
}
