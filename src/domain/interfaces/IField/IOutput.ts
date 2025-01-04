import type { IDateTimeField } from './IDateTime'
import type { ILongTextField } from './ILongText'
import type { INumberField } from './INumber'
import type { ISingleLineTextField } from './ISingleLineText'

export type IOutputField = Omit<
  ISingleLineTextField | ILongTextField | INumberField | IDateTimeField,
  'name'
>
