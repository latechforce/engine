import type { IBaseField } from './base'

/**
 * Single attachment field interface
 * @title Single attachment field
 * @description Represents a field that can store a single file attachment
 * @example
 * {
 *   type: 'SingleAttachment',
 *   name: 'profilePicture',
 *   required: false,
 * }
 */
export interface ISingleAttachmentField extends IBaseField {
  type: 'SingleAttachment'
}
