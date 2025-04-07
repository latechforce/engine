import { DateTimeField } from './DateTime'
import { EmailField } from './Email'
import { LongTextField } from './LongText'
import { SingleLineTextField } from './SingleLineText'
import { NumberField } from './Number'
import { FormulaField } from './Formula'
import { SingleSelectField } from './SingleSelect'
import { SingleLinkedRecordField } from './SingleLinkedRecord'
import { MultipleLinkedRecordField } from './MultipleLinkedRecord'
import { RollupField } from './Rollup'
import { CheckboxField } from './Checkbox'
import { MultipleSelectField } from './MultipleSelect'
import { MultipleAttachmentField } from './MultipleAttachment'
import { UrlField } from './Url'
import { SingleAttachmentField } from './SingleAttachment'

export type Field =
  | EmailField
  | SingleLineTextField
  | LongTextField
  | DateTimeField
  | NumberField
  | FormulaField
  | SingleSelectField
  | SingleLinkedRecordField
  | MultipleLinkedRecordField
  | RollupField
  | CheckboxField
  | MultipleSelectField
  | MultipleAttachmentField
  | UrlField
  | SingleAttachmentField

export type FieldName =
  | 'Email'
  | 'SingleLineText'
  | 'LongText'
  | 'DateTime'
  | 'Number'
  | 'Formula'
  | 'SingleSelect'
  | 'SingleLinkedRecord'
  | 'MultipleLinkedRecord'
  | 'Rollup'
  | 'Checkbox'
  | 'MultipleSelect'
  | 'MultipleAttachment'
  | 'Url'
  | 'SingleAttachment'

export {
  EmailField,
  SingleLineTextField,
  LongTextField,
  DateTimeField,
  NumberField,
  FormulaField,
  SingleSelectField,
  SingleLinkedRecordField,
  MultipleLinkedRecordField,
  RollupField,
  CheckboxField,
  MultipleSelectField,
  MultipleAttachmentField,
  UrlField,
  SingleAttachmentField,
}
