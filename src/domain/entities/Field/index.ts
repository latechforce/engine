import { DateTimeField, type DateTimeFieldConfig } from './DateTime'
import { EmailField, type EmailFieldConfig } from './Email'
import { LongTextField, type LongTextFieldConfig } from './LongText'
import { SingleLineTextField, type SingleLineTextFieldConfig } from './SingleLineText'
import { NumberField, type NumberFieldConfig } from './Number'
import { FormulaField, type FormulaFieldConfig } from './Formula'
import { SingleSelectField, type SingleSelectFieldConfig } from './SingleSelect'
import { SingleLinkedRecordField, type SingleLinkedRecordFieldConfig } from './SingleLinkedRecord'
import {
  MultipleLinkedRecordField,
  type MultipleLinkedRecordFieldConfig,
} from './MultipleLinkedRecord'
import { RollupField, type RollupFieldConfig } from './Rollup'
import { CheckboxField, type CheckboxFieldConfig } from './Checkbox'
import { MultipleSelectField, type MultipleSelectFieldConfig } from './MultipleSelect'
import { MultipleAttachmentField, type MultipleAttachmentFieldConfig } from './MultipleAttachment'
import { UrlField, type UrlFieldConfig } from './Url'
import { SingleAttachmentField, type SingleAttachmentFieldConfig } from './SingleAttachment'

export type FieldConfig =
  | EmailFieldConfig
  | SingleLineTextFieldConfig
  | LongTextFieldConfig
  | DateTimeFieldConfig
  | NumberFieldConfig
  | FormulaFieldConfig
  | SingleSelectFieldConfig
  | SingleLinkedRecordFieldConfig
  | MultipleLinkedRecordFieldConfig
  | RollupFieldConfig
  | CheckboxFieldConfig
  | MultipleSelectFieldConfig
  | MultipleAttachmentFieldConfig
  | UrlFieldConfig
  | SingleAttachmentFieldConfig

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
