import type { CheckboxFieldSchema } from './CheckboxSchema'
import type { DateTimeFieldSchema } from './DateTimeSchema'
import type { EmailFieldSchema } from './EmailSchema'
import type { FormulaFieldSchema } from './FormulaSchema'
import type { LongTextFieldSchema } from './LongTextSchema'
import type { MultipleAttachmentFieldSchema } from './MultipleAttachmentSchema'
import type { MultipleLinkedRecordFieldSchema } from './MultipleLinkedRecordSchema'
import type { MultipleSelectFieldSchema } from './MultipleSelectSchema'
import type { NumberFieldSchema } from './NumberSchema'
import type { RollupFieldSchema } from './RollupSchema'
import type { SingleAttachmentFieldSchema } from './SingleAttachmentSchema'
import type { SingleLineTextFieldSchema } from './SingleLineTextSchema'
import type { SingleLinkedRecordFieldSchema } from './SingleLinkedRecordSchema'
import type { SingleSelectFieldSchema } from './SingleSelectSchema'
import type { UrlFieldSchema } from './UrlSchema'

/**
 * Field type union
 * @title Field types
 * @description Union type of all possible field types that can be used in forms and tables
 * @example
 * // Single line text field example
 * {
 *   type: 'SingleLineText',
 *   name: 'fullName',
 *   label: 'Full Name',
 *   required: true
 * }
 * @example
 * // Email field example
 * {
 *   type: 'Email',
 *   name: 'email',
 *   label: 'Email Address',
 *   required: true,
 *   unique: true
 * }
 * @example
 * // Number field example
 * {
 *   type: 'Number',
 *   name: 'age',
 *   label: 'Age',
 *   min: 0,
 *   max: 120
 * }
 * @example
 * // Single select field example
 * {
 *   type: 'SingleSelect',
 *   name: 'status',
 *   label: 'Status',
 *   options: ['Active', 'Inactive', 'Pending']
 * }
 */
export type FieldSchema =
  | DateTimeFieldSchema
  | EmailFieldSchema
  | FormulaFieldSchema
  | LongTextFieldSchema
  | MultipleLinkedRecordFieldSchema
  | NumberFieldSchema
  | RollupFieldSchema
  | SingleLineTextFieldSchema
  | SingleLinkedRecordFieldSchema
  | SingleSelectFieldSchema
  | MultipleSelectFieldSchema
  | CheckboxFieldSchema
  | MultipleAttachmentFieldSchema
  | UrlFieldSchema
  | SingleAttachmentFieldSchema
