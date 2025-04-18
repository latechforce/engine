import type { UrlFieldConfig } from '/domain/entities/Field/Url'

/**
 * Url field interface
 * @title Url
 * @description Represents a field that stores an URL.
 */
export type UrlFieldTableSchema = {
  name: UrlFieldConfig['name']
  type: UrlFieldConfig['type']
  /**
   * @default '`false`'
   */
  required?: UrlFieldConfig['required']
}
