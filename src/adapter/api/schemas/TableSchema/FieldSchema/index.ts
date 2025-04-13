import type { CheckboxFieldTableSchema } from './CheckboxSchema'
import type { DateTimeFieldTableSchema } from './DateTimeSchema'
import type { EmailFieldTableSchema } from './EmailSchema'
import type { FormulaFieldTableSchema } from './FormulaSchema'
import type { LongTextFieldTableSchema } from './LongTextSchema'
import type { MultipleAttachmentFieldTableSchema } from './MultipleAttachmentSchema'
import type { MultipleLinkedRecordFieldTableSchema } from './MultipleLinkedRecordSchema'
import type { MultipleSelectFieldTableSchema } from './MultipleSelectSchema'
import type { NumberFieldTableSchema } from './NumberSchema'
import type { RollupFieldTableSchema } from './RollupSchema'
import type { SingleAttachmentFieldTableSchema } from './SingleAttachmentSchema'
import type { SingleLineTextFieldTableSchema } from './SingleLineTextSchema'
import type { SingleLinkedRecordFieldTableSchema } from './SingleLinkedRecordSchema'
import type { SingleSelectFieldTableSchema } from './SingleSelectSchema'
import type { UrlFieldTableSchema } from './UrlSchema'

/**
 * Field type union
 * @title Field
 * @description Union type of all possible field types that can be used in forms and tables
 * @example
 * {
 *   type: 'SingleLineText',
 *   name: 'full_name',
 *   required: true
 * }
 */
export type FieldTableSchema =
  | DateTimeFieldTableSchema
  | EmailFieldTableSchema
  | FormulaFieldTableSchema
  | LongTextFieldTableSchema
  | MultipleLinkedRecordFieldTableSchema
  | NumberFieldTableSchema
  | RollupFieldTableSchema
  | SingleLineTextFieldTableSchema
  | SingleLinkedRecordFieldTableSchema
  | SingleSelectFieldTableSchema
  | MultipleSelectFieldTableSchema
  | CheckboxFieldTableSchema
  | MultipleAttachmentFieldTableSchema
  | UrlFieldTableSchema
  | SingleAttachmentFieldTableSchema
