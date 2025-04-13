import type { CreateRecordDatabaseServiceActionAutomationSchema } from './CreateRecordSchema'
import type { ReadRecordDatabaseServiceActionAutomationSchema } from './ReadRecordSchema'

/**
 * The schema for the Database service action.
 * @title Database
 * @description The Database service action.
 */
export type DatabaseServiceActionAutomationSchema =
  | ReadRecordDatabaseServiceActionAutomationSchema
  | CreateRecordDatabaseServiceActionAutomationSchema
