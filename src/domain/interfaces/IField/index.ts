import type { ICheckboxField } from './ICheckbox'
import type { IDateTimeField } from './IDateTime'
import type { IEmailField } from './IEmail'
import type { IFormulaField } from './IFormula'
import type { ILongTextField } from './ILongText'
import type { IMultipleAttachmentField } from './IMultipleAttachment'
import type { IMultipleLinkedRecordField } from './IMultipleLinkedRecord'
import type { IMultipleSelectField } from './IMultipleSelect'
import type { INumberField } from './INumber'
import type { IRollupField } from './IRollup'
import type { ISingleAttachmentField } from './ISingleAttachment'
import type { ISingleLineTextField } from './ISingleLineText'
import type { ISingleLinkedRecordField } from './ISingleLinkedRecord'
import type { ISingleSelectField } from './ISingleSelect'
import type { IUrlField } from './IUrl'

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
export type IField =
  | IDateTimeField
  | IEmailField
  | IFormulaField
  | ILongTextField
  | IMultipleLinkedRecordField
  | INumberField
  | IRollupField
  | ISingleLineTextField
  | ISingleLinkedRecordField
  | ISingleSelectField
  | IMultipleSelectField
  | ICheckboxField
  | IMultipleAttachmentField
  | IUrlField
  | ISingleAttachmentField
