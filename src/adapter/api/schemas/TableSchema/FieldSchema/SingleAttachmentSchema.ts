import type { SingleAttachmentFieldConfig } from '/domain/entities/Field/SingleAttachment'

/**
 * Single attachment field interface
 * @title Single attachment
 * @description Represents a field that stores a single attachment.
 */
export type SingleAttachmentFieldTableSchema = {
  name: SingleAttachmentFieldConfig['name']
  type: SingleAttachmentFieldConfig['type']
  /**
   * @default '`false`'
   */
  required?: SingleAttachmentFieldConfig['required']
}
