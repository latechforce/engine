import type { SingleAttachmentFieldConfig } from '/domain/entities/Field/SingleAttachment'

/**
 * Single attachment field interface
 * @title Single attachment
 * @description Represents a field that can store a single file attachment
 * @example
 * {
 *   type: 'SingleAttachment',
 *   name: 'profilePicture',
 *   required: true
 * }
 */
export type SingleAttachmentFieldSchema = SingleAttachmentFieldConfig
