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
import type { ISingleLineTextField } from './ISingleLineText'
import type { ISingleLinkedRecordField } from './ISingleLinkedRecord'
import type { ISingleSelectField } from './ISingleSelect'

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
