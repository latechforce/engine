import type { ReadRecordDatabaseActionSchema } from './Database/ReadRecordSchema'
import type { CreateRecordDatabaseActionSchema } from './Database/CreateRecordSchema'
import type { RunJavascriptCodeActionSchema } from './Code/RunJavascriptSchema'
import type { RunTypescriptCodeActionSchema } from './Code/RunTypescriptSchema'

export type ActionServiceSchema =
  | RunJavascriptCodeActionSchema
  | RunTypescriptCodeActionSchema
  | CreateRecordDatabaseActionSchema
  | ReadRecordDatabaseActionSchema
