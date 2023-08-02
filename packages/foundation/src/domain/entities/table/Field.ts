import { Currency } from './fields/Currency'
import { Datetime } from './fields/Datetime'
import { Formula } from './fields/Formula'
import { LongText } from './fields/LongText'
import { MultipleLinkedRecords } from './fields/MultipleLinkedRecords'
import { NumberField } from './fields/NumberField'
import { Rollup } from './fields/Rollup'
import { SingleLineText } from './fields/SingleLineText'
import { SingleLinkRecord } from './fields/SingleLinkedRecord'
import { SingleSelect } from './fields/SingleSelect'

export type Field =
  | Currency
  | Formula
  | LongText
  | MultipleLinkedRecords
  | NumberField
  | Rollup
  | SingleLineText
  | SingleLinkRecord
  | Datetime
  | SingleSelect