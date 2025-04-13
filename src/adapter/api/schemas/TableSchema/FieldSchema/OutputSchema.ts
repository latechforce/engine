import type { DateTimeFieldSchema } from './DateTimeSchema'
import type { LongTextFieldSchema } from './LongTextSchema'
import type { NumberFieldSchema } from './NumberSchema'
import type { SingleLineTextFieldSchema } from './SingleLineTextSchema'

export type OutputFieldSchema = Omit<
  SingleLineTextFieldSchema | LongTextFieldSchema | NumberFieldSchema | DateTimeFieldSchema,
  'name'
>
