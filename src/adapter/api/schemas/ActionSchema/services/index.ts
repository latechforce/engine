import type { ReadRecordDatabaseActionSchema } from './database/ReadRecordSchema'
import type { CreateRecordDatabaseActionSchema } from './database/CreateRecordSchema'
import type { RunJavascriptCodeActionSchema } from './code/RunJavascriptSchema'
import type { RunTypescriptCodeActionSchema } from './code/RunTypescriptSchema'

export type ActionServiceSchema =
  | RunJavascriptCodeActionSchema
  | RunTypescriptCodeActionSchema
  | CreateRecordDatabaseActionSchema
  | ReadRecordDatabaseActionSchema
